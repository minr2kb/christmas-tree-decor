import { OrnamentWithInitialPositionType } from '@/types/ornament';
import { Image, Text } from '@chakra-ui/react';
import { ORNAMENT_SIZE, TEMP_SCALE } from '@/constants/consts';
import { useMemo, useCallback, memo, useState, useEffect } from 'react';
import { debounce } from '@/utils/debounce';

const ANIMATION_DURATION = 5;

interface OrnamentProps {
  ornament: OrnamentWithInitialPositionType;
  treeWidth: number;
  treeHeight: number;
}

const Ornament = ({ ornament, treeWidth, treeHeight }: OrnamentProps) => {
  const [showName, setShowName] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { id, name, type, position, initialPosition, scale, rotation } = ornament;

  const calculateRealPositions = useCallback(() => {
    const pixelX = window.innerWidth / 2 + (position.x - 0.5) * treeWidth;
    const pixelY = window.innerHeight * 0.05 + position.y * treeHeight;
    const initialX = window.innerWidth * initialPosition.x;
    const initialY = window.innerHeight * initialPosition.y;

    return { pixelX, pixelY, initialX, initialY };
  }, [position.x, position.y, initialPosition.x, initialPosition.y, treeWidth, treeHeight]);

  const [realPositions, setRealPositions] = useState(calculateRealPositions);

  useEffect(() => {
    const handleResize = debounce(() => {
      setRealPositions(calculateRealPositions());
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [calculateRealPositions]);

  const handleImageLoad = useCallback(() => {
    setShowName(true);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
      setShowName(false);
    }, ANIMATION_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const imageStyle = useMemo(() => {
    if (!isLoaded) {
      return {
        position: 'absolute',
        left: `${realPositions.initialX}px`,
        top: `${realPositions.initialY}px`,
        width: `${ORNAMENT_SIZE}vh`,
        transform: `scale(0.1)`,
        transition: 'all 1s ease',
      };
    }

    if (!isAnimationComplete) {
      return {
        position: 'absolute',
        left: `${realPositions.initialX}px`,
        top: `${realPositions.initialY}px`,
        width: `${ORNAMENT_SIZE}vh`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${TEMP_SCALE})`,
        filter: 'drop-shadow(0 0 3px #fff)',
        transition: 'all 1s ease',
      };
    }

    return {
      position: 'absolute',
      left: `${realPositions.pixelX}px`,
      top: `${realPositions.pixelY}px`,
      width: `${ORNAMENT_SIZE}vh`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
      transition: 'all 1s ease',
    };
  }, [isLoaded, isAnimationComplete, realPositions, rotation, scale, TEMP_SCALE]);

  return (
    <>
      <Image
        key={id}
        data-id={id}
        src={`/assets/ornaments/orn2-${type}.png`}
        alt="ornament"
        css={imageStyle}
        onLoad={handleImageLoad}
      />
      {showName && (
        <Text
          css={{
            position: 'absolute',
            left: `${realPositions.initialX}px`,
            transform: `translate(-50%, 150%)`,
            top: `${realPositions.initialY}px`,
            color: 'white',
            fontSize: `${ORNAMENT_SIZE * 0.6}rem`,
            textShadow: '0 0 3px black',
            fontWeight: 'semibold',
          }}
        >
          {name}
        </Text>
      )}
    </>
  );
};

export default memo(Ornament);
