import React, { createContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

const ToastComponent: React.FC<{ toast: Toast; onDismiss: (id: number) => void }> = ({ toast, onDismiss }) => {
  const [exiting, setExiting] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const baseClasses = 'fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 rounded-lg shadow-lg text-gray-100 transition-all duration-300';
  const typeClasses = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  };
  
  const animationClasses = exiting ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0';

  return (
    <div className={`${baseClasses} ${typeClasses[toast.type]} ${animationClasses}`} role="alert">
      <div className="text-sm font-semibold">{toast.message}</div>
    </div>
  );
};


export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {toasts.map(toast => (
          <ToastComponent key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};