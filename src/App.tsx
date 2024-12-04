import { Suspense } from 'react';
import TreePage from '@/pages/TreePage';
import SendPage from '@/pages/SendPage';
import HomePage from '@/pages/HomePage';
import LoadingPage from '@/pages/LoadingPage';
import ErrorPage from '@/pages/ErrorPage';
import CreatePage from '@/pages/CreatePage';
import Fonts from '@/theme/Fonts';
import { Toaster } from '@/components/ui/toaster';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
      <Suspense fallback={<LoadingPage />}>
        <ChakraProvider defaultTheme="dark">
          <Toaster />
          <Fonts />
          <RouterProvider router={router} />
        </ChakraProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
