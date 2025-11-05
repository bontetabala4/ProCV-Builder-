import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set ) => ({
      user: null,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        localStorage.setItem('authToken', token);
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem('authToken');
        set({ user: null, isAuthenticated: false });
        window.location.href = '/login';
      },

      checkAuth: () => {
        const token = localStorage.getItem('authToken');
        const isAuthenticated = !!token;
        set({ isAuthenticated });
        return isAuthenticated;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);