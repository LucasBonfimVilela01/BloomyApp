import ScreenContainer from '@/assets/components/ScreenContainer';
import { Stack } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { auth } from './firebaseconfig.js';

export default function MainPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <View style={pageStyles.pageBackground}>
        <ScreenContainer>
          {user ? (
            <Text>Bem-vindo, {user.displayName || user.email}!</Text>
          ) : (
            <Text>Por favor, faça login ou registre-se.</Text>
          )}
          {/* ... outros elementos da sua página inicial */}
        </ScreenContainer>
      </View>
    </>
  );
}

const pageStyles = StyleSheet.create({
  pageBackground: { flex: 1, backgroundColor: '#F9E9FF' },
});


