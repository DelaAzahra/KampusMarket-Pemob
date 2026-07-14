import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../navigation/AuthContext';
import { Colors } from '../constants/colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Keluar Aplikasi',
      'Apakah Anda yakin ingin keluar dari KampusMarket?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Keluar', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarLarge}>
            <Ionicons name="person" size={50} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>{user?.name || 'Andrino Syaddani'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'andrino.syaddani@student.ac.id'}</Text>
          
          <View style={styles.identityBadge}>
            <Ionicons name="school" size={16} color={Colors.primary} />
            <Text style={styles.identityText}>Mahasiswa Terverifikasi</Text>
          </View>
        </View>

        {/* Academic Details (UAS Identity verification) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Identitas Pengembang (UAS)</Text>
          
          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="person-outline" size={20} color={Colors.primary} />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Nama Mahasiswa</Text>
              <Text style={styles.infoValue}>Andrino Syaddani</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="card-outline" size={20} color={Colors.success} />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>NIM / Nomor Induk Mahasiswa</Text>
              <Text style={styles.infoValue}>233510307</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="business-outline" size={20} color={Colors.warning} />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Universitas / Fakultas</Text>
              <Text style={styles.infoValue}>Universitas Islam Riau / Teknik</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="git-branch-outline" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Program Studi / Kelas</Text>
              <Text style={styles.infoValue}>Teknik Informatika / 06TPLP007</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoIconWrapper}>
              <Ionicons name="book-outline" size={20} color="#EC4899" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoLabel}>Mata Kuliah</Text>
              <Text style={styles.infoValue}>Praktikum Pemrograman Mobile</Text>
            </View>
          </View>
        </View>

        {/* Account Menu Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Pengaturan Aplikasi</Text>
          
          <TouchableOpacity style={styles.menuRow} onPress={() => alert('Fitur Edit Profil Mock')}>
            <Ionicons name="create-outline" size={20} color={Colors.secondary} />
            <Text style={styles.menuText}>Edit Profil Pengguna</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.placeholder} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} onPress={() => alert('Fitur Toko Saya Mock')}>
            <Ionicons name="storefront-outline" size={20} color={Colors.secondary} />
            <Text style={styles.menuText}>Toko Saya (Jualan)</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.placeholder} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuRow} onPress={() => alert('Fitur Transaksi Mock')}>
            <Ionicons name="receipt-outline" size={20} color={Colors.secondary} />
            <Text style={styles.menuText}>Riwayat Transaksi</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.placeholder} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuRow, { borderBottomWidth: 0 }]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
            <Text style={[styles.menuText, { color: Colors.danger }]}>Keluar Aplikasi</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.danger} />
          </TouchableOpacity>
        </View>

        <Text style={styles.copyrightText}>KampusMarket v1.0.0 • Andrino Syaddani</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeaderCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  avatarLarge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  identityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  identityText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  infoIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextWrapper: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.placeholder,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 12,
  },
  copyrightText: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.placeholder,
    fontWeight: '500',
    marginVertical: 24,
  },
});
