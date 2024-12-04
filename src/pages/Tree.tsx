import { Container } from '@chakra-ui/react';
import Snowfall from 'react-snowfall';
import Background from '@/components/Background';
import ChristmasTree from '@/components/ChristmasTree';
import Controls from '@/components/Controls';
import Ornament from '@/components/Ornament';
import useTreePage from '@/hooks/useTreePage';
import ErrorPage from './Error';
import Loading from './Loading';
import BackdropTitle from '@/components/BackdropTitle';

const Tree = () => {
  const {
    toggleFullScreen,
    ornaments,
    showTriangle,
    showCount,
    showSnow,
    showStar,
    treeHeight,
    treeWidth,
    isValidTreeId,
    isLoading,
    treeId,
  } = useTreePage();

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
        height: '100vh',
        backgroundImage: 'url(/assets/bg.png)',
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
      {showSnow && <Snowfall speed={[0.5, 0.7]} wind={[-0.1, 0.1]} radius={[1, 2]} />}
    </Container>
  );
};

export default Tree;
