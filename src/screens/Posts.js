import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import PostSkeletonCard from '../../components/skeleton/PostSkeletonCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../../components/Navbar';

const LIMIT = 10;

const Posts = ({ navigation }) => {
  const theme = useTheme();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchPosts = async (pageNumber = 0, isRefresh = false) => {
    try {
      setError(false);

      if (pageNumber === 0 && !isRefresh) {
        setLoading(true);
      } else if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoadingMore(true);
      }

      const skip = pageNumber * LIMIT;
      const res = await fetch(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`,
      );

      if (!res.ok) throw new Error('Network error');

      const data = await res.json();

      setTotal(data.total);

      setPosts(prev =>
        pageNumber === 0 ? data.posts : [...prev, ...data.posts],
      );

      setPage(pageNumber);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const onRefresh = useCallback(() => {
    fetchPosts(0, true);
  }, []);

  const onEndReached = () => {
    if (posts.length < total && !loadingMore) {
      fetchPosts(page + 1);
    }
  };

  const renderItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PostDetail', { id: item.id })}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" numberOfLines={2}>
              {item.title}
            </Text>

            <Text variant="bodyMedium" numberOfLines={3} style={styles.body}>
              {item.body}
            </Text>

            <View style={styles.footer}>
              <Text variant="labelSmall">{item.views} Views</Text>

              <Text variant="labelSmall">
                {item.reactions?.likes ?? 0} Reactions
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ),
    [navigation],
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={{ padding: 16 }}>
        <ActivityIndicator />
      </View>
    ) : null;

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Something went wrong</Text>
        <Button mode="contained" onPress={() => fetchPosts(0)}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title={'Posts'} />
      {loading ? (
        <View style={{ padding: 16 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <PostSkeletonCard key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={posts}
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
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  body: {
    marginTop: 8,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skeletonCard: {
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  skeletonTitle: {
    height: 20,
    backgroundColor: '#d1d5db',
    borderRadius: 6,
    marginBottom: 10,
    width: '80%',
  },
  skeletonLine: {
    height: 14,
    backgroundColor: '#d1d5db',
    borderRadius: 6,
    marginBottom: 8,
    width: '100%',
  },
});

export default Posts;
