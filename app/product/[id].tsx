import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import DetailScreen from '../../screens/DetailScreen';
import LoadingView from '../../components/LoadingView';
import ErrorView from '../../components/ErrorView';
import { Product } from '../../types/product';

export default function ProductDetailRoute() {
  const params = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!params.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://dummyjson.com/products/${params.id}`);
      if (!res.ok) throw new Error('Produk tidak ditemukan');
      const data = await res.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat detail produk');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.product) {
      try {
        const parsed = JSON.parse(params.product as string) as Product;
        // Verify we got a valid object with necessary fields
        if (parsed && parsed.id && parsed.title) {
          setProduct(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        // Fallback to fetch if parse fails
      }
    }
    fetchProduct();
  }, [params.product, params.id]);

  if (loading) {
    return <LoadingView message="Memuat detail produk..." />;
  }

  if (error || !product) {
    return <ErrorView message={error || 'Produk tidak valid'} onRetry={fetchProduct} />;
  }

  const route = {
    params: {
      product: product,
    },
  };

  return <DetailScreen route={route} />;
}
