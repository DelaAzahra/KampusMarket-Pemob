import React, { useEffect } from 'react';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../navigation/AuthContext';

function RootLayoutBehavior() {
  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // Tunggu hingga navigation state selesai di-mount
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';
    const inProductRoute = segments[0] === 'product';

    const timeout = setTimeout(() => {
      if (!isLoggedIn) {
        // Jika belum login dan belum di halaman auth → arahkan ke login
        if (!inAuthGroup) {
          router.replace('/login');
        }
      } else {
        // Jika sudah login dan masih di halaman auth → arahkan ke tabs
        if (inAuthGroup) {
          router.replace('/(tabs)');
        }
        // Jika sudah login dan di root (bukan tabs/product) → arahkan ke tabs
        if (!inAuthGroup && !inTabsGroup && !inProductRoute) {
          router.replace('/(tabs)');
        }
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [isLoggedIn, segments, navigationState]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="product/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutBehavior />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
