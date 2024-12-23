export const isInAppBrowser = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  return /kakaotalk|line|inapp|naver|snapchat|instagram|everytimeapp|whatsapp|electron|wadiz|aliapp|zumapp|whale|kakaostory|band|twitter|daumapps|daumdevice\/mobile|fb_iab|fb4a|fban|fbios|fbss|trill\/[^1]/i.test(
    userAgent,
  );
};

export const isIOS = () => {
  return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
};

export const isKakaoTalk = () => {
  return /kakaotalk/i.test(navigator.userAgent.toLowerCase());
};

export const isLine = () => {
  return /line/i.test(navigator.userAgent.toLowerCase());
};
