import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Surface } from 'react-native-paper';

const PostSkeletonCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Surface style={styles.title} />
        <Surface style={styles.line} />
        <Surface style={styles.line} />

        <View style={styles.footer}>
          <Surface style={styles.small} />
          <Surface style={styles.small} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  title: {
    height: 20,
    width: '80%',
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
  },
  line: {
    height: 14,
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  small: {
    height: 12,
    width: 50,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
});

export default PostSkeletonCard;
