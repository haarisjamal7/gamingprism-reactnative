import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../../components/Navbar';
import PostSkeletonCard from '../../components/skeleton/PostSkeletonCard';

const LIMIT = 10;

const Products = ({ navigation }) => {
  const theme = useTheme();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchProducts = async (pageNumber = 0, isRefresh = false) => {
    try {
      setError(false);

      if (pageNumber === 0 && !isRefresh) setLoading(true);
      else if (isRefresh) setRefreshing(true);
      else setLoadingMore(true);

      const skip = pageNumber * LIMIT;
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`,
      );

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();

      setTotal(data.total);
      setProducts(prev =>
        pageNumber === 0 ? data.products : [...prev, ...data.products],
      );
      setPage(pageNumber);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(0);
  }, []);

  const onRefresh = useCallback(() => {
    fetchProducts(0, true);
  }, []);

  const onEndReached = () => {
    if (products.length < total && !loadingMore) {
      fetchProducts(page + 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    >
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text variant="titleMedium" numberOfLines={2}>
                {item.title}
              </Text>

              <Text variant="bodySmall" numberOfLines={2} style={styles.desc}>
                {item.description}
              </Text>

              <View style={styles.footer}>
                <Text variant="labelMedium">₹{item.price}</Text>
                <Text variant="labelSmall">⭐ {item.rating}</Text>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Failed to load products</Text>
        <Button mode="contained" onPress={() => fetchProducts(0)}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title="Products" />

      {loading ? (
        <View style={{ padding: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <PostSkeletonCard key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
          onEndReached={onEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            loadingMore ? <ActivityIndicator style={{ margin: 16 }} /> : null
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    marginBottom: 16,
    borderRadius: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  desc: {
    marginTop: 4,
    color: '#555',
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Products;
