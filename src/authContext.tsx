import { onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from './firebaseconfig';

type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let unsubscribe: (() => void) | undefined;

    // Timeout de segurança: força conclusão após 5s
    timeoutId = setTimeout(() => {
      console.warn('⏱️ Firebase auth timeout (5s) - forçando conclusão');
      setLoading(false);
    }, 5000);

    try {
      unsubscribe = onAuthStateChanged(
        auth,
        (u) => {
          console.log('🔐 Auth state:', u ? `Logado (${u.email})` : 'Deslogado');
          setUser(u);
          setLoading(false);
          clearTimeout(timeoutId);
        },
        (error) => {
          console.error('❌ Erro Firebase auth:', error);
          setLoading(false);
          clearTimeout(timeoutId);
        }
      );
    } catch (error) {
      console.error('❌ Erro ao criar listener Firebase:', error);
      setLoading(false);
      clearTimeout(timeoutId);
    }

    return () => {
      if (unsubscribe) unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
