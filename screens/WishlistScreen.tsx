import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface ItemWishlist {
  id: string;
  nama: string;
  harga: string;
  kategori: string;
  penjual: string;
  kondisi: string;
}

export default function WishlistScreen() {
  // Data contoh wishlist barang bekas mahasiswa
  const daftarWishlist: ItemWishlist[] = [
    {
      id: 'w1',
      nama: 'Buku Kalkulus Purcell Edisi 9 Bekas',
      harga: 'Rp 85.000',
      kategori: 'Buku',
      penjual: 'Ahmad R. (Teknik Sipil, Sem. 4)',
      kondisi: 'Layak Pakai',
    },
    {
      id: 'w2',
      nama: 'Laptop ASUS VivoBook 14 Core i5 Bekas',
      harga: 'Rp 3.200.000',
      kategori: 'Laptop',
      penjual: 'Dewi S. (Informatika, Sem. 6)',
      kondisi: 'Sangat Baik',
    },
    {
      id: 'w3',
      nama: 'Keyboard Mekanik Rexus MX 5.1 Bekas',
      harga: 'Rp 250.000',
      kategori: 'Elektronik',
      penjual: 'Reza P. (Sistem Informasi, Sem. 4)',
      kondisi: 'Baik',
    },
    {
      id: 'w4',
      nama: 'Sepatu Kuliah Kulit Pria Ukuran 42',
      harga: 'Rp 175.000',
      kategori: 'Fashion',
      penjual: 'Fajar M. (Manajemen, Sem. 2)',
      kondisi: 'Layak Pakai',
    },
  ];

  const handleTawar = (item: ItemWishlist) => {
    Alert.alert(
      'Tawar Harga',
      `Anda akan membuka negosiasi harga untuk:\n"${item.nama}"\n\nHarga saat ini: ${item.harga}\n\nFitur chat akan tersedia pada versi berikutnya.`,
      [{ text: 'Mengerti', style: 'default' }]
    );
  };

  const handleHapusWishlist = (item: ItemWishlist) => {
    Alert.alert(
      'Hapus dari Wishlist',
      `Apakah Anda yakin ingin menghapus "${item.nama}" dari daftar wishlist?`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive' },
      ]
    );
  };

  const renderItem = ({ item }: { item: ItemWishlist }) => (
    <View style={styles.kartu}>
      {/* Header Kartu */}
      <View style={styles.headerKartu}>
        <View style={styles.badgeKategori}>
          <Text style={styles.teksKategori}>{item.kategori.toUpperCase()}</Text>
        </View>
        <TouchableOpacity
          style={styles.tombolHapus}
          activeOpacity={0.7}
          onPress={() => handleHapusWishlist(item)}
        >
          <Ionicons name="heart" size={22} color={Colors.danger} />
        </TouchableOpacity>
      </View>

      {/* Nama & Harga */}
      <Text style={styles.namaBarang} numberOfLines={2}>{item.nama}</Text>
      <Text style={styles.harga}>{item.harga}</Text>

      {/* Badge Kondisi */}
      <View style={styles.kondisiBadge}>
        <Ionicons name="checkmark-circle-outline" size={13} color="#059669" />
        <Text style={styles.kondisiTeks}>Kondisi: {item.kondisi}</Text>
      </View>

      <View style={styles.garis} />

      {/* Footer: Penjual & Tombol Tawar */}
      <View style={styles.footer}>
        <View style={styles.infoPenjual}>
          <Ionicons name="person-circle-outline" size={16} color={Colors.textMuted} />
          <Text style={styles.teksPenjual} numberOfLines={1}>{item.penjual}</Text>
        </View>
        <TouchableOpacity
          style={styles.tombolTawar}
          activeOpacity={0.8}
          onPress={() => handleTawar(item)}
        >
          <Text style={styles.teksTawar}>Tawar</Text>
          <Ionicons name="chatbubble-ellipses-outline" size={13} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Halaman */}
      <View style={styles.headerHalaman}>
        <View>
          <Text style={styles.judulHalaman}>Wishlist Saya</Text>
          <Text style={styles.subjudul}>Barang favorit yang ingin dibeli</Text>
        </View>
        <View style={styles.badgeJumlah}>
          <Text style={styles.teksJumlah}>{daftarWishlist.length} Barang</Text>
        </View>
      </View>

      {/* Daftar atau Kosong */}
      {daftarWishlist.length === 0 ? (
        <View style={styles.kosong}>
          <View style={styles.ikonBulat}>
            <Ionicons name="heart-dislike-outline" size={40} color={Colors.placeholder} />
          </View>
          <Text style={styles.judulKosong}>Wishlist Masih Kosong</Text>
          <Text style={styles.deskripsiKosong}>
            Anda belum menambahkan barang ke wishlist.{'\n'}
            Temukan barang bekas yang Anda inginkan di halaman Katalog.
          </Text>
        </View>
      ) : (
        <FlatList
          data={daftarWishlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.daftarKonten}
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

  // Header
  headerHalaman: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  judulHalaman: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  subjudul: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  badgeJumlah: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  teksJumlah: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Daftar
  daftarKonten: {
    padding: 16,
  },

  // Kartu
  kartu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerKartu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeKategori: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  teksKategori: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
  tombolHapus: {
    padding: 2,
  },
  namaBarang: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 20,
  },
  harga: {
    fontSize: 17,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 8,
  },
  kondisiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  kondisiTeks: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  garis: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoPenjual: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
    marginRight: 8,
  },
  teksPenjual: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
    flex: 1,
  },
  tombolTawar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 5,
  },
  teksTawar: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Kosong
  kosong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  ikonBulat: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  judulKosong: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  deskripsiKosong: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
