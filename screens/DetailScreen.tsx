import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Product } from '../types/product';
import { Colors } from '../constants/colors';
import { formatPrice } from '../services/api';

export default function DetailScreen({ route }: any) {
  const product = route?.params?.product as Product;

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Ionicons name="cube-outline" size={48} color={Colors.placeholder} />
        <Text style={styles.emptyText}>Produk tidak ditemukan</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleHubungi = () =>
    Alert.alert('Hubungi Penjual', `Menghubungi penjual barang "${product.title}" via chat.`, [{ text: 'OK' }]);

  const handleBeli = () =>
    Alert.alert('Berhasil!', `"${product.title}" ditambahkan ke keranjang.`, [{ text: 'OK' }]);

  const hargaFormatted = formatPrice(product.price);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Gambar Produk */}
        <View style={styles.imageBox}>
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.gambar}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.tombolKembali} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* Info Produk */}
        <View style={styles.konten}>

          {/* Kategori & Rating */}
          <View style={styles.baris}>
            <Text style={styles.kategori}>{product.category.toUpperCase()}</Text>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.ratingTeks}>{product.rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Nama & Harga */}
          <Text style={styles.namaProduk}>{product.title}</Text>
          <Text style={styles.harga}>{hargaFormatted}</Text>

          {/* Kondisi */}
          <View style={styles.kondisi}>
            <Ionicons name="checkmark-circle" size={16} color="#059669" />
            <Text style={styles.kondisiTeks}>Kondisi: Layak Pakai</Text>
          </View>

          <View style={styles.garis} />

          {/* Deskripsi */}
          <Text style={styles.judulSeksi}>Deskripsi Produk</Text>
          <Text style={styles.deskripsi}>{product.description}</Text>

          <View style={styles.garis} />

          {/* Info Penjual */}
          <Text style={styles.judulSeksi}>Informasi Penjual</Text>
          <View style={styles.penjualKartu}>
            <View style={styles.avatarBulat}>
              <Ionicons name="person" size={22} color="#FFFFFF" />
            </View>
            <View style={styles.infoPenjual}>
              <Text style={styles.namaPenjual}>Andrino Syaddani</Text>
              <Text style={styles.rolePenjual}>Mahasiswa • Terverifikasi ✓</Text>
            </View>
            <View style={styles.dotOnline} />
          </View>

        </View>
      </ScrollView>

      {/* Tombol Aksi Bawah */}
      <View style={styles.barBawah}>
        <TouchableOpacity style={styles.tombolOutline} onPress={handleHubungi}>
          <Ionicons name="chatbubble-outline" size={18} color={Colors.primary} />
          <Text style={styles.teksOutline}>Hubungi Penjual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tombolSolid} onPress={handleBeli}>
          <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
          <Text style={styles.teksSolid}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '600',
  },
  backBtn: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  scroll: {
    paddingBottom: 90,
  },

  // Gambar
  imageBox: {
    height: 280,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  gambar: {
    width: '100%',
    height: '100%',
  },
  tombolKembali: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  // Konten
  konten: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -16,
    padding: 20,
  },
  baris: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  kategori: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingTeks: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B45309',
  },
  namaProduk: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 6,
  },
  harga: {
    fontSize: 22,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 14,
  },
  kondisi: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  kondisiTeks: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
  },
  garis: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  judulSeksi: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  deskripsi: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },

  // Penjual
  penjualKartu: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarBulat: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoPenjual: {
    marginLeft: 12,
    flex: 1,
  },
  namaPenjual: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  rolePenjual: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  dotOnline: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },

  // Bar bawah
  barBawah: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 10,
  },
  tombolOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    height: 46,
    gap: 6,
  },
  teksOutline: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  tombolSolid: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 10,
    height: 46,
    gap: 6,
  },
  teksSolid: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
