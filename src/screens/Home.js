import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Welcome to
        </Text>
        <Text style={styles.title}>GamingPrism Pvt Ltd</Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Explore posts and products powered by live APIs.
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsWrapper}>
        {/* POSTS CARD */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Posts')}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">Posts</Text>

              <Text variant="bodyMedium" style={styles.cardDesc}>
                Read dynamic posts with pagination, pull-to-refresh, and
                detailed views.
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>

        {/* PRODUCTS CARD */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Products')}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">Products</Text>

              <Text variant="bodyMedium" style={styles.cardDesc}>
                Browse products with images, ratings, prices and detail pages.
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    marginBottom: 24,
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    color: '#555',
  },

  cardsWrapper: {
    gap: 16,
  },

  card: {
    borderRadius: 16,
    paddingVertical: 12,
  },

  cardDesc: {
    marginTop: 8,
    color: '#666',
  },
});

export default HomeScreen;
