import { Container } from '@chakra-ui/react';
import Snowfall from 'react-snowfall';
import Background from '@/components/Background';
import ChristmasTree from '@/components/ChristmasTree';
import Controls from '@/components/Controls';
import Ornament from '@/components/Ornament';
import useTreePage from '@/hooks/logic/useTreePage';
import ErrorPage from './ErrorPage';
import Loading from './LoadingPage';
import BackdropTitle from '@/components/BackdropTitle';
import Fade from '@/components/Fade';

const TreePage = () => {
  const {
    toggleFullScreen,
    ornaments,
    treeState,
    showTriangle,
    treeHeight,
    treeWidth,
    isValidTreeId,
    isLoading,
    treeId,
  } = useTreePage();

  const { showCount = false, showSnow = false, showStar = false } = treeState ?? {};

  if (isLoading) {
    return <Loading />;
  }

  if (!isValidTreeId) {
    return <ErrorPage error={new Error('트리를 찾을 수 없어요')} />;
  }

  return (
    <Container
      p={0}
      css={{
        position: 'relative',
        width: '100vw',
        maxWidth: '100vw',
        height: '100dvh',
        backgroundImage: 'url(/assets/images/bg.png)',
        bgColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Background showCount={showCount} />
      <ChristmasTree showTriangle={showTriangle} showStar={showStar} treeHeight={treeHeight} treeWidth={treeWidth} />

      {ornaments.map((ornament) => (
        <Ornament key={ornament.id} ornament={ornament} treeWidth={treeWidth} treeHeight={treeHeight} />
      ))}

      <Controls toggleFullScreen={toggleFullScreen} treeId={treeId} />
      <BackdropTitle />
      <Fade in={showSnow} duration={1000}>
        <Snowfall speed={[0.5, 0.7]} wind={[-0.1, 0.1]} snowflakeCount={200} />
      </Fade>
    </Container>
  );
};

export default TreePage;
