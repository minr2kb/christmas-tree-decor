import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* 이서윤체 */
      @font-face {
        font-family: 'LeeSeoyun';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }

      /* 프리텐다드 */
      @font-face {
        font-family: 'Pretendard';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }

      /* 산토끼 */
      @font-face {
        font-family: 'HSSanTokki20';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
      }
    `}
  />
);

export default Fonts;
