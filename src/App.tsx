import { Suspense, useEffect } from 'react';
import TreePage from '@/pages/TreePage';
import SendPage from '@/pages/SendPage';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
import LoadingPage from '@/pages/LoadingPage';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import CreatePage from '@/pages/CreatePage';
import Fonts from '@/theme/Fonts';
import { Toaster } from '@/components/ui/toaster';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthCallbackPage from './pages/AuthCallbackPage';
import supabase from './supabase/client';
import { sessionAtom } from './store/auth';
import { useSetAtom } from 'jotai';
import ConfirmDialog from './components/ConfirmDialog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/create',
    element: <CreatePage />,
  },
  {
    path: '/scan',
    element: <ScanPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/tree/:treeId',
    element: <TreePage />,
  },
  {
    path: '/send/:treeId',
    element: <SendPage />,
  },
  {
    path: '*',
    element: <ErrorPage error={new Error('Page Not Found')} />,
  },
]);

function App() {
  const setSession = useSetAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
      <Suspense fallback={<LoadingPage />}>
        <ChakraProvider defaultTheme="dark">
          <Toaster />
          <ConfirmDialog />
          <Fonts />
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
        </ChakraProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
