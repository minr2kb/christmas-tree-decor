import { Box, Image } from '@chakra-ui/react';
import { TREE_HEIGHT_RATIO } from '@/constants/consts';
import { memo } from 'react';

interface ChristmasTreeProps {
  showTriangle: boolean;
  treeHeight: number;
  treeWidth: number;
  showStar: boolean;
}

const ChristmasTree = memo(({ showTriangle, showStar, treeHeight, treeWidth }: ChristmasTreeProps) => {
  return (
    <>
      <Image
        id="tree"
        src="/assets/tree.png"
        alt="tree"
        css={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100%',
        }}
      />

      <Image
        id="star"
        src="/assets/star.png"
        alt="star"
        css={{
          position: 'absolute',
          left: '50%',
          top: '2%',
          transform: `translateX(-50%) scale(${showStar ? 1 : 0})`,
          height: '13%',
          transition: 'transform 0.2s ease',
        }}
      />

      {showTriangle && (
        <Box
          css={{
            position: 'absolute',
            left: '50%',
            top: `${((1 - TREE_HEIGHT_RATIO) * 100) / 2}vh`,
            transform: 'translateX(-50%)',
            height: `${treeHeight}px`,
            width: `${treeWidth}px`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
});

export default ChristmasTree;
