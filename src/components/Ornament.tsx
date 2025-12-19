import { OrnamentWithInitialPositionType } from '@/types/ornament';
import { Box, Image, Text } from '@chakra-ui/react';
import { ORNAMENT_ANIMATION_DURATION, ORNAMENT_SIZE, TEMP_SCALE } from '@/constants/ui';
import { useMemo, useCallback, memo, useState, useEffect } from 'react';
import { debounce } from '@/utils/debounce';
import { Tooltip } from '@/components/ui/tooltip';
import Fade from './Fade';

interface OrnamentProps {
  ornament: OrnamentWithInitialPositionType;
  treeWidth: number;
  treeHeight: number;
}

const Ornament = memo(({ ornament, treeWidth, treeHeight }: OrnamentProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { id, name, type, position, initialPosition, scale, rotation } = ornament;

  const calculateInitialPosition = useCallback(() => {
    if (!initialPosition) return { x: null, y: null };
    return {
      x: window.innerWidth * initialPosition.x,
      y: window.innerHeight * initialPosition.y,
    };
  }, [initialPosition]);

  const calculateRealPosition = useCallback(() => {
    const x = window.innerWidth / 2 + (position.x - 0.5) * treeWidth;
    const y = window.innerHeight * 0.05 + position.y * treeHeight;
    return { x, y };
  }, [position.x, position.y, treeWidth, treeHeight]);

  const [realPosition, setRealPosition] = useState(calculateRealPosition);
  const [realInitPosition, setRealInitPosition] = useState(calculateInitialPosition);

  useEffect(() => {
    const handleResize = debounce(() => {
      setRealPosition(calculateRealPosition());
      setRealInitPosition(calculateInitialPosition());
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [calculateRealPosition, calculateInitialPosition]);

  const handleImageLoad = useCallback(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const timer = setTimeout(() => {
      setIsAnimationComplete(true);
    }, ORNAMENT_ANIMATION_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  const boxStyle = useMemo(() => {
    if (initialPosition && !isLoaded) {
      return {
        position: 'absolute',
        width: `${ORNAMENT_SIZE}vh`,
        transform: `translate3d(${realInitPosition.x}px, ${realInitPosition.y}px, 0) translate(-50%, -50%) scale(0.1)`,
        transition: 'all 1s ease',
        willChange: 'transform, opacity',
      };
    }

    if (initialPosition && !isAnimationComplete) {
      return {
        position: 'absolute',
        width: `${ORNAMENT_SIZE}vh`,
        transform: `translate3d(${realInitPosition.x}px, ${realInitPosition.y}px, 0) translate(-50%, -50%) scale(${TEMP_SCALE})`,
        filter: 'drop-shadow(0 0 5px #fff)',
        transition: 'all 1s cubic-bezier(.75,0,.3,1.26)',
        willChange: 'transform, opacity',
      };
    }

    return {
      position: 'absolute',
      width: `${ORNAMENT_SIZE}vh`,
      transform: `translate3d(${realPosition.x}px, ${realPosition.y}px, 0) translate(-50%, -50%) scale(${scale})`,
      transition: 'all 1s cubic-bezier(.74,-0.38,.28,.99)',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPosition, isLoaded, isAnimationComplete, scale]);

  return (
    <Box css={boxStyle}>
      <Tooltip
        content={name}
        openDelay={0}
        closeDelay={0}
        positioning={{ placement: 'bottom' }}
        showArrow
        disabled={!!initialPosition && !isAnimationComplete}
      >
        <Image
          key={id}
          data-id={id}
          src={`/assets/images/ornaments/orn${type}.png`}
          alt="ornament"
          onLoad={handleImageLoad}
          css={{ transform: `rotate(${rotation}deg)` }}
        />
      </Tooltip>

      <Fade in={!!initialPosition && !isAnimationComplete}>
        <Box position="relative">
          <Text
            css={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: `${ORNAMENT_SIZE * 0.1}rem`,
              fontWeight: 'bold',
              textShadow: '0 0 2px #000',
              whiteSpace: 'nowrap',
              //   filter: 'drop-shadow(0 0 5px #fff)',
            }}
          >
            {name}
          </Text>
        </Box>
      </Fade>
    </Box>
  );
});

export default Ornament;
