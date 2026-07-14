import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../navigation/AuthContext';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import { validateName, validateEmail, validatePassword } from '../utils/validation';
import { Colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  const isFormValid = !nameError && !emailError && !passwordError;

  const handleLogin = async () => {
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!isFormValid) return;

    setLoading(true);
    try {
      await login(name, email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Ionicons name="cart" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>KampusMarket</Text>
          <Text style={styles.subtitle}>Beli barang bekas kampus jadi lebih mudah</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Masuk Akun</Text>
          
          <InputField
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap Anda"
            iconName="person-outline"
            value={name}
            onChangeText={setName}
            touched={nameTouched}
            error={nameError}
            onBlur={() => setNameTouched(true)}
          />

          <InputField
            label="Email Mahasiswa"
            placeholder="nama@mahasiswa.ac.id"
            iconName="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            touched={emailTouched}
            error={emailError}
            onBlur={() => setEmailTouched(true)}
          />

          <InputField
            label="Password"
            placeholder="Masukkan password minimal 6 karakter"
            iconName="lock-closed-outline"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            touched={passwordTouched}
            error={passwordError}
            onBlur={() => setPasswordTouched(true)}
          />

          <ButtonPrimary
            title="Masuk Sekarang"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
          />
        </View>
        
        <Text style={styles.footerText}>UAS Praktikum Pemrograman Mobile</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '750',
    color: Colors.text,
    marginBottom: 20,
  },
  button: {
    marginTop: 8,
  },
  footerText: {
    textAlign: 'center',
    color: Colors.placeholder,
    fontSize: 12,
    marginTop: 32,
    fontWeight: '500',
  },
});
