'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      document.cookie = 'auth_session_token=; path=/; max-age=0; SameSite=Lax';
    }

    try {
      await fetch('/api/auth/session', {
        method: 'DELETE',
      });
    } catch {
      // Ignora falhas de rede na limpeza de sessão
    }

    router.push('/login');
    router.refresh();
  }, [router]);

  return { logout };
}

