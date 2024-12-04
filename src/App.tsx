import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import Tree from '@/pages/Tree';
import Send from '@/pages/Send';
import Home from '@/pages/Home';
import Fonts from '@/theme/Fonts';
import { Toaster } from '@/components/ui/toaster';
import Loading from '@/pages/Loading';

import ErrorPage from '@/pages/Error';
import { ErrorBoundary } from 'react-error-boundary';
import Create from '@/pages/Create';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/create',
    element: <Create />,
  },
  {
    path: '/tree/:treeId',
    element: <Tree />,
  },
  {
    path: '/send/:treeId',
    element: <Send />,
  },

  {
    path: '*',
    element: <ErrorPage error={new Error('Page Not Found')} />,
  },
]);

function App() {
  return (
    <ErrorBoundary fallbackRender={({ error }) => <ErrorPage error={error} />}>
      <Suspense fallback={<Loading />}>
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
