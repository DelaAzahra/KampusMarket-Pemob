import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types/product';
import { Colors } from '../constants/colors';
import { formatPrice } from '../services/api';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>

      {/* Gambar Produk */}
      <View style={styles.imageBox}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.gambar}
          resizeMode="cover"
        />
        <View style={styles.badgeKategori}>
          <Text style={styles.teksBadge} numberOfLines={1}>{product.category}</Text>
        </View>
      </View>

      {/* Informasi Produk */}
      <View style={styles.info}>
        <Text style={styles.namaBarang} numberOfLines={2}>
          {product.title}
        </Text>

        {/* Harga & Rating */}
        <View style={styles.barisHarga}>
          <Text style={styles.harga}>{formatPrice(product.price)}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={11} color="#F59E0B" />
            <Text style={styles.teksRating}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        {/* Tombol Lihat Detail */}
        <TouchableOpacity style={styles.tombolDetail} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.teksTombol}>Lihat Detail</Text>
          <Ionicons name="arrow-forward-outline" size={13} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  imageBox: {
    height: 120,
    backgroundColor: '#F1F5F9',
    position: 'relative',
  },
  gambar: {
    width: '100%',
    height: '100%',
  },
  badgeKategori: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    maxWidth: '80%',
  },
  teksBadge: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  info: {
    padding: 10,
  },
  namaBarang: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 17,
    minHeight: 34,
    marginBottom: 6,
  },
  barisHarga: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  harga: {
    fontSize: 13,
    fontWeight: '800',
    color: '#059669',
    flexShrink: 1,
    marginRight: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    gap: 2,
  },
  teksRating: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  tombolDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 7,
    gap: 4,
  },
  teksTombol: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
