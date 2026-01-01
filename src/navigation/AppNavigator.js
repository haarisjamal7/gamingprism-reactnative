import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Posts from '../screens/Posts';
import PostDetailScreen from '../screens/PostDetail';
import Products from '../screens/Products';
import ProductDetailScreen from '../screens/ProductDetail';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Posts" component={Posts} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
