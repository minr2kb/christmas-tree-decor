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

const TreePage = lazy(() => import('@/pages/TreePage'));
const SendPage = lazy(() => import('@/pages/SendPage'));
const MyTreesPage = lazy(() => import('@/pages/MyTreesPage'));

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    element: <ProtectedRoute requireAuth showLoginModal />,
    children: [
      {
        path: ROUTES.create,
        element: <CreatePage />,
      },
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
    path: ROUTES.scan,
    element: <ScanPage />,
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
    <ChakraProvider defaultTheme="dark">
      <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
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
  );
}

export default App;
