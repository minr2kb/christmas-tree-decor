# 🎄 크리스마스 트리 실시간 꾸미기

실시간으로 스크린에 나타난 트리를 함께 꾸미는 프로젝트입니다.

## 🌟 주요 기능

- **실시간 트리 꾸미기**: QR 코드를 통해 여러 사용자가 동시에 트리를 꾸밀 수 있습니다
- **트리 관리**: 사용자별로 여러 개의 트리를 생성하고 관리할 수 있습니다
- **실시간 애니메이션**: 장식을 추가할 때 자연스러운 애니메이션 효과를 제공합니다
- **반응형 디자인**: 모바일과 데스크톱 환경을 모두 지원합니다

## 🛠 기술 스택

### Frontend

- React 18
- TypeScript
- Chakra UI v3
- React Router v6
- Jotai (상태관리)
- Vite (빌드도구)

### Backend & Infrastructure

- Supabase (Backend & Authentication)
- Firebase Hosting

## 🎯 주요 특징

### 실시간 인터랙션

- Supabase Realtime을 활용한 실시간 데이터 동기화
- 내부 animationQueue를 활용한 자연스러운 조건부 애니메이션 구현
- WebRTC 기반 QR 코드 스캔

### 보안

- Row Level Security (RLS) 적용
- 욕설 필터링 (Aho-Corasick 알고리즘 사용)
- router 레벨의 session 검증

### 사용자 경험 (UX)

- 직관적이고 부드러운 애니메이션
- 로딩/에러 상태 처리
- 토스트 메시지를 통한 사용자 피드백
- CSS transform을 활용한 성능 최적화

### 개발자 도구 및 단축키

- QR 코드 생성 및 다운로드
- 공유 링크 복사
- 더미 UI 삽입 기능
- 전체화면, 별, 눈, 카운트 등의 UI 조작 기능 단축키 지원

## 📁 프로젝트 구조

```
src/
├── api/ # API 통신 로직
├── components/ # 재사용 가능한 컴포넌트
├── hooks/ # 커스텀 훅
├── pages/ # 페이지 컴포넌트
├── store/ # 전역 상태 관리
├── theme/ # UI 테마 설정
├── types/ # TypeScript 타입 정의
└── utils/ # 유틸리티 함수
```

## 🚀 시작하기

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

### 빌드

```bash
yarn build
```

### 타입 생성

```bash
yarn typegen:db # supabase-cli
yarn typegen:theme # chakra-cli
```

### 배포

```bash
yarn deploy
```

## 🔑 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정해주세요:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

## 📱 사용 방법

1. 대형 스크린 등에 트리 화면을 띄웁니다 (`/tree/:treeId`)
2. 내부 메뉴에서 QR생성 / url 복사를 하여 링크를 참가자들에게 공유합니다
3. 참여자는 QR코드를 스캔하여 접속합니다 (`/send/:treeId`)
4. 원하는 장식을 선택하여 트리에 추가합니다

## 👨‍💻 개발자

- **Kyungbae Min** - [GitHub](https://github.com/minr2kb)
- Email: kbmin1129@gmail.com

## 🔗 링크

- 배포 주소: [https://christmas-tree-decor.web.app/](https://christmas-tree-decor.web.app/)
- 이슈 트래커: [GitHub Issues](https://github.com/minr2kb/christmas-tree-decor/issues)
