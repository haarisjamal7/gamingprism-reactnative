import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Card,
  Text,
  Button,
  IconButton,
  useTheme,
  Surface,
} from 'react-native-paper';
import Navbar from '../../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const PostDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const theme = useTheme();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);

  const fetchPost = async () => {
    try {
      setError(false);
      setLoading(true);

      const res = await fetch(`https://dummyjson.com/posts/${id}`);
      if (!res.ok) throw new Error('Failed');

      const data = await res.json();
      setPost(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Surface style={styles.skeletonTitle} />
            <Surface style={styles.skeletonLine} />
            <Surface style={styles.skeletonLine} />
            <Surface style={styles.skeletonLine} />
          </Card.Content>
        </Card>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text variant="titleMedium">Something went wrong</Text>
        <Button mode="contained" onPress={fetchPost} style={{ marginTop: 12 }}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView>
        <Navbar title="Post Detail" />
        <ScrollView contentContainerStyle={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall">{post.title}</Text>

              <Text variant="bodyMedium" style={styles.body}>
                {post.body}
              </Text>

              <View style={styles.tags}>
                {post.tags?.map(tag => (
                  <Surface key={tag} style={styles.tag}>
                    <Text variant="labelSmall">#{tag}</Text>
                  </Surface>
                ))}
              </View>

              <View style={styles.footer}>
                <Text variant="labelMedium">Views: {post.views}</Text>

                <IconButton
                  icon={liked ? 'heart' : 'heart-outline'}
                  onPress={() => setLiked(prev => !prev)}
                />
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
  },
  body: {
    marginTop: 12,
    lineHeight: 22,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Skeleton
  skeletonTitle: {
    height: 24,
    width: '90%',
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 14,
  },
  skeletonLine: {
    height: 14,
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 10,
  },
});

export default PostDetailScreen;
