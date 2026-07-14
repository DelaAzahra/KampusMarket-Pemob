import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuth } from '../navigation/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types/product';
import { Colors } from '../constants/colors';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import ProductCard from '../components/ProductCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import EmptyState from '../components/EmptyState';

export default function HomeScreen() {
  const { user } = useAuth();
  const { products, loading, error, refetch } = useProducts();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Semua']);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories from products list
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCats = ['Semua', ...new Set(products.map((p) => p.category))];
      setCategories(uniqueCats);
    }
  }, [products]);

  // Real-time local Search & Category Filter
  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'Semua') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== '') {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  // Navigation handlers
  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/product/[id]',
      params: {
        id: product.id.toString(),
        product: JSON.stringify(product)
      }
    });
  };

  const handleProfileNavigation = () => {
    router.push('/profile');
  };

  // Render items
  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  if (loading) {
    return <LoadingView message="Memuat barang bekas mahasiswa..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header showing UAS Identity */}
      <Header
        title="KampusMarket"
        subtitle={`by ${user?.name || 'Andrino Syaddani'}`}
        rightIcon="person-circle-outline"
        onRightPress={handleProfileNavigation}
      />

      {/* Real-time Search Box */}
      <View style={styles.searchSection}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      {/* Horizontal Categories Filter List */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              isActive={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>
      </View>

      {/* FlatList Catalog Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          iconName="cube-outline"
          title="Produk Tidak Ditemukan"
          description="Coba gunakan kata kunci pencarian lain atau klik tombol reset filter."
          actionText="Reset Pencarian"
          onActionPress={() => {
            setSearchQuery('');
            setSelectedCategory('Semua');
          }}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
