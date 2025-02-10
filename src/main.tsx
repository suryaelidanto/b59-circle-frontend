import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider as ChakraProvider } from '@/components/ui/provider.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
      <Toaster />
    </ChakraProvider>
  </StrictMode>
);
