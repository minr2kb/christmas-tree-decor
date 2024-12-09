import { Box, Image } from '@chakra-ui/react';
import { TREE_HEIGHT_RATIO } from '@/constants/ui';
import { memo } from 'react';
import { keyframes } from '@emotion/react';

interface ChristmasTreeProps {
  showTriangle: boolean;
  treeHeight: number;
  treeWidth: number;
  showStar: boolean;
}

const contrastAnimation = keyframes`
  from {
    filter: contrast(100%);
  }
  to {
    filter: contrast(120%);
  }
`;

const brightnessAnimation = keyframes`
  from {
    filter: brightness(100%);
  }
  to {
    filter: brightness(110%);
  }
`;

const ChristmasTree = memo(({ showTriangle, showStar, treeHeight, treeWidth }: ChristmasTreeProps) => {
  return (
    <>
      <Image
        id="tree"
        src="/assets/images/tree.png"
        alt="tree"
        css={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          height: '100%',
          animation: `${contrastAnimation} 2s infinite alternate`,
        }}
      />

      <Image
        id="star"
        src="/assets/images/star.png"
        alt="star"
        css={{
          position: 'absolute',
          left: '50%',
          top: '2%',
          transform: `translateX(-50%) scale(${showStar ? 1 : 0})`,
          opacity: showStar ? 1 : 0,
          height: '13%',
          transition: 'opacity 1s ease, transform 1s ease',
          animation: `${brightnessAnimation} 1s infinite alternate`,
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
