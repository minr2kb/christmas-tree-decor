import { Box, Center, Container, ContainerProps } from '@chakra-ui/react';
import Header, { HeaderProps } from './Header';
import LoadingPage from '@/pages/LoadingPage';
import ErrorPage from '@/pages/ErrorPage';
import Footer from './Footer';

type PageLayoutProps = {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  containerProps?: ContainerProps;
  center?: boolean;
  bgColor?: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
};

const PageLayout = ({
  children,
  center = false,
  headerProps,
  containerProps,
  bgColor = 'bg',
  isLoading = false,
  isError = false,
  error,
}: PageLayoutProps) => {
  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <ErrorPage error={error ?? new Error('알 수 없는 오류가 발생했어요')} />;
  }

  return (
    <Box bgColor={bgColor} position="relative" minH="100vh" display="flex" flexDirection="column">
      <Header {...headerProps} />
      <Container as="main" maxW="xs" p={4} mx="auto" flex={1} display="flex" flexDirection="column" {...containerProps}>
        {center ? (
          <Center flex={1} flexDirection="column">
            {children}
          </Center>
        ) : (
          children
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default PageLayout;
