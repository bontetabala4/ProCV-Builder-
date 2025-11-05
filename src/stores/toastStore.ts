import { create } from 'zustand';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  
  addToast: (toast) => {
    const id = Date.now().toString();
    set((state) => ({ 
      toasts: [...state.toasts, { ...toast, id }] 
    }));
  },
  
  removeToast: (id) => {
    set((state) => ({ 
      toasts: state.toasts.filter((toast) => toast.id !== id) 
    }));
  },
  
  clearToasts: () => {
    set({ toasts: [] });
  }
}));

// Hook utilitaire pour utiliser les toasts
export const useToast = () => {
  const { addToast } = useToastStore();
  
  const showToast = (
    message: string, 
    type: Toast['type'] = 'info', 
    duration?: number
  ) => {
    addToast({ message, type, duration });
  };
  
  return {
    showSuccess: (message: string, duration?: number) => 
      showToast(message, 'success', duration),
    showError: (message: string, duration?: number) => 
      showToast(message, 'error', duration),
    showWarning: (message: string, duration?: number) => 
      showToast(message, 'warning', duration),
    showInfo: (message: string, duration?: number) => 
      showToast(message, 'info', duration),
  };
};