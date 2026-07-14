import React from 'react';
import { useNavigation } from 'expo-router';
import WishlistScreen from '../../screens/WishlistScreen';

export default function WishlistRoute() {
  const navigation = useNavigation();
  return <WishlistScreen navigation={navigation} />;
}
