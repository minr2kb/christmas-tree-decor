import { css, Global } from '@emotion/react';

const fontFaces = css`
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
    font-weight: 500;
    font-style: normal;
  }

  /* 페이퍼로지 */
  @font-face {
    font-family: 'Paperlogy';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`;

const Fonts = () => (
  <Global
    styles={`
      ${fontFaces.styles}
    `}
  />
);

export default Fonts;
