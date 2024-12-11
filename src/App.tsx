import { lazy, Suspense, useEffect } from 'react';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
import LoadingPage from '@/pages/LoadingPage';
import ErrorPage from '@/pages/ErrorPage';
import CreatePage from '@/pages/CreatePage';
import RemotePage from '@/pages/RemotePage';
import Fonts from '@/theme/Fonts';
import { Toaster } from '@/components/ui/toaster';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import supabase from '@/supabase/client';
import { sessionAtom } from '@/store/auth';
import { useSetAtom } from 'jotai';
import ConfirmDialog from '@/components/ConfirmDialog';
import LoginModal from '@/components/LoginModal';
import { ROUTES } from './constants/routes';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { logger, setUser } from './utils/logger';
import Layout from '@/components/Layout';
import { HelmetProvider } from 'react-helmet-async';

const TreePage = lazy(() => import('@/pages/TreePage'));
const SendPage = lazy(() => import('@/pages/SendPage'));
const MyTreesPage = lazy(() => import('@/pages/MyTreesPage'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.home,
        element: <HomePage />,
      },
      {
        path: ROUTES.scan,
        element: <ScanPage />,
      },
      {
        path: ROUTES.create,
        element: <CreatePage />,
      },
      {
        element: <ProtectedRoute requireAuth showLoginModal />,
        children: [
          {
            path: ROUTES.myTrees,
            element: <MyTreesPage />,
          },
          {
            path: ROUTES.remote(),
            element: <RemotePage />,
          },
        ],
      },
      {
        path: ROUTES.tree(),
        element: <TreePage />,
      },
      {
        path: ROUTES.send(),
        element: <SendPage />,
      },

      {
        path: ROUTES.authCallback,
        element: <AuthCallbackPage />,
      },
      {
        path: ROUTES.other,
        element: <ErrorPage error={new Error('Page Not Found')} />,
      },
    ],
  },
]);

function App() {
  const setSession = useSetAtom(sessionAtom);

  const handleError = (error: Error) => {
    logger.error('Error in App', error, {
      error,
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (session?.user) {
        setUser(session?.user.id, {
          id: session?.user.id,
          email: session?.user.email,
          created_at: session?.user.created_at,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <HelmetProvider>
      <ChakraProvider defaultTheme="dark">
        <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />} onError={handleError}>
          <Suspense fallback={<LoadingPage />}>
            <Toaster />
            <ConfirmDialog />
            <LoginModal />
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
              }}
            />
            <Fonts />
          </Suspense>
        </ErrorBoundary>
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
