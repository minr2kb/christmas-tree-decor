import { OrnamentWithInitialPositionType } from '@/types/ornament';
import { Image, Text } from '@chakra-ui/react';
import { ORNAMENT_SIZE, TEMP_SCALE } from '@/constants/ui';
import { useMemo, useCallback, memo, useState, useEffect } from 'react';
import { debounce } from '@/utils/debounce';
import { Tooltip } from '@/components/ui/tooltip';

const ANIMATION_DURATION = 5;

interface OrnamentProps {
  ornament: OrnamentWithInitialPositionType;
  treeWidth: number;
  treeHeight: number;
}

const Ornament = memo(({ ornament, treeWidth, treeHeight }: OrnamentProps) => {
  const [showName, setShowName] = useState(false);
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
    if (initialPosition && !isLoaded) {
      return {
        position: 'absolute',
        width: `${ORNAMENT_SIZE}vh`,
        transform: `translate3d(${realInitPosition.x}px, ${realInitPosition.y}px, 0) scale(0.1)`,
        transition: 'all 1s ease',
        willChange: 'transform, opacity',
      };
    }

    if (initialPosition && !isAnimationComplete) {
      return {
        position: 'absolute',
        width: `${ORNAMENT_SIZE}vh`,
        transform: `translate3d(${realInitPosition.x}px, ${realInitPosition.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${TEMP_SCALE})`,
        filter: 'drop-shadow(0 0 3px #fff)',
        transition: 'all 1s ease',
        willChange: 'transform, opacity',
      };
    }

    return {
      position: 'absolute',
      width: `${ORNAMENT_SIZE}vh`,
      transform: `translate3d(${realPosition.x}px, ${realPosition.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
      transition: 'all 1s ease',
    };
  }, [initialPosition, isLoaded, isAnimationComplete, realPosition, rotation, scale]);

  return (
    <>
      <Tooltip content={name} openDelay={0} closeDelay={0} positioning={{ placement: 'bottom' }} showArrow>
        <Image
          key={id}
          data-id={id}
          src={`/assets/images/ornaments/orn2-${type}.png`}
          alt="ornament"
          css={imageStyle}
          onLoad={handleImageLoad}
        />
      </Tooltip>
      {initialPosition && !isAnimationComplete && (
        <Text
          css={{
            position: 'absolute',
            transform: `translate(${realInitPosition.x}px, ${realInitPosition.y}px) translate(-50%, 150%)`,
            color: 'white',
            fontSize: `${ORNAMENT_SIZE * 0.6}rem`,
            fontWeight: 'bold',
            textShadow: '0 0 3px blackAlpha.50',
            whiteSpace: 'nowrap',
            opacity: showName ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        >
          {name}
        </Text>
      )}
    </>
  );
});

export default Ornament;
