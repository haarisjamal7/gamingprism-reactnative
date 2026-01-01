import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Text, Button, IconButton, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../../components/Navbar';

const ProductDetailScreen = ({ route }) => {
  const { id } = route.params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setProduct(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Surface style={styles.skeletonImage} />
        <Surface style={styles.skeletonLine} />
        <Surface style={styles.skeletonLine} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Failed to load product</Text>
        <Button mode="contained" onPress={fetchProduct}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar title="Product Detail" />

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall">{product.title}</Text>

            <Text style={styles.price}>₹{product.price}</Text>

            <Text style={styles.desc}>{product.description}</Text>

            <View style={styles.meta}>
              <Text> {product.rating}</Text>
              <Text>Stock: {product.stock}</Text>
            </View>

            <IconButton
              icon={liked ? 'heart' : 'heart-outline'}
              onPress={() => setLiked(p => !p)}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
  },
  desc: {
    color: '#555',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  skeletonImage: {
    height: 220,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  skeletonLine: {
    height: 16,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
});

export default ProductDetailScreen;
