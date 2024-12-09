import { Box, Center, Container, ContainerProps } from '@chakra-ui/react';
import Header, { HeaderProps } from './Header';
import LoadingPage from '@/pages/LoadingPage';
import ErrorPage from '@/pages/ErrorPage';
import Footer from './Footer';
import { Snowfall } from 'react-snowfall';
import Background from './Background';

type PageLayoutProps = {
  children: React.ReactNode;
  maxWidth?: ContainerProps['maxW'];
  disableSnowfall?: boolean;
  disableBackground?: boolean;
  disableHeader?: boolean;
  disableFooter?: boolean;
  disablePadding?: boolean;
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
  maxWidth = 'xs',
  disableSnowfall = false,
  disableBackground = false,
  disableHeader = false,
  disableFooter = false,
  disablePadding = false,
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
      {!disableBackground && <Background />}
      {!disableSnowfall && <Snowfall speed={[0.5, 0.7]} wind={[-0.1, 0.1]} snowflakeCount={100} radius={[0.5, 1]} />}
      {!disableHeader && <Header {...headerProps} />}

      <Container
        position="relative"
        as="main"
        maxW={maxWidth}
        p={disablePadding ? 0 : 4}
        mx="auto"
        flex={1}
        display="flex"
        flexDirection="column"
        {...containerProps}
      >
        {center ? (
          <Center flex={1} flexDirection="column">
            {children}
          </Center>
        ) : (
          children
        )}
      </Container>

      {!disableFooter && <Footer />}
    </Box>
  );
};

export default PageLayout;
