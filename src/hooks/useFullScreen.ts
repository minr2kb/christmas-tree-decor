import useKeyPress from './useKeyPress';

const useFullScreen = () => {
  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useKeyPress({
    f: toggleFullScreen,
  });

  return { toggleFullScreen };
};

export default useFullScreen;
