import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, View } from 'react-native';
import { AuthProvider, useAuth } from '../src/authContext';

function LayoutInner() {
  const router = useRouter();
  const pathname = usePathname();
  const [fontsLoaded] = useFonts({
    'Bebas-Neue': require('../assets/fonts/BebasNeue-Regular.ttf'),
  });
  const { user, loading } = useAuth();

  // Redireciona após login/signup para /mainpage e após logout para /
  useEffect(() => {
    if (loading) return;
    if (user) {
      // Não redireciona a partir da index; apenas de login/signup
      if (pathname === '/login' || pathname === '/signup') {
        router.replace('/mainpage');
      }
    } else {
      // Se deslogado, mantém acesso a index, login e signup
      if (pathname !== '/' && pathname !== '/login' && pathname !== '/signup') {
        router.replace('/');
      }
    }
  }, [user, loading, pathname]);

  // Apenas após declarar todos os hooks fazemos retornos condicionais
  if (!fontsLoaded) return null;
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: true,
        headerStyle: { backgroundColor: '#BA68C8' },
        headerTintColor: '#fff',
        headerTitle: () => (
          <Image
            source={require('../assets/images/LogoBloomySemFundo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        ),
        contentStyle: { backgroundColor: '#F9E9FF' }, // Fundo sólido para telas sem imagem
      }}
    >
      {/* Index agora sem header */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      {/* Mainpage com header customizado */}
      <Stack.Screen
        name="mainpage"
        options={{
          headerShown: true,
          headerLeft: () =>
            router.canGoBack() ? (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color="#fff"
                  style={styles.headerIcon}
                />
              </Pressable>
            ) : null,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable
                onPress={() => router.push('/settingspage')}
                style={({ pressed }) => [styles.circleButton, pressed && { opacity: 0.8 }]}
              >
                <FontAwesome name="cog" size={20} color="#fff" />
              </Pressable>
              <Pressable
                onPress={() => router.push('/accountpage')}
                style={({ pressed }) => [styles.circleButton, pressed && { opacity: 0.8 }]}
              >
                <Ionicons name="person-sharp" size={20} color="#fff" />
              </Pressable>
            </View>
          ),
        }}
      />

      {/* Tela de Login (sem header) */}
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown: false,
          headerLeft: () =>
            router.canGoBack() ? (
              <Pressable onPress={() => router.back()}>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
            ) : null,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Pressable onPress={() => router.push('/settingspage')}>
                <FontAwesome
                  name="cog"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
              <Pressable onPress={() => router.push('/accountpage')}>
                <Ionicons
                  name="person-sharp"
                  size={24}
                  color="black"
                  style={styles.headerIcon}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      {/* Tela de Cadastro - Header Escondido */}
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function AppLayout() {
  return (
    <AuthProvider>
      <LayoutInner />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 5,
  },
  headerLogo: {
    width: 200,
    height: 50,
    padding: 10,
    marginBottom: 5,
  },
  circleButton: {
    backgroundColor: '#FFBB56',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});