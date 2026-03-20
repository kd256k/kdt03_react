# KDT03 React
## 프로젝트 소개
AI 데이터 분석 풀스택 웹 개발자 양성과정(2025 3기) React 기반 웹 애플리케이션입니다.
공공 API 연동, Supabase 인증/DB, 다양한 React 패턴을 실습한 프로젝트입니다.
## 배포 | Live Demo
https://kdt03-react-nine.vercel.app
## 기술 스택
- **Library**: React 19, React Router 7
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **Backend**: Supabase (GitHub OAuth 인증, DB), Vercel Serverless Functions (CORS 프록시)
- **State**: Jotai
- **Deploy**: Vercel
## 주요 기능
- **로그인**: GitHub OAuth 인증 (Supabase Auth)
- **로또 번호 생성기**: 랜덤 번호 생성 UI
- **영화 박스오피스**: KOBIS API 연동, 일별 박스오피스 조회, TMDB 영화 포스터 표시
- **관광지 갤러리**: 한국관광공사 API 연동, 관광지 이미지 조회
- **부산 축제 정보**: 공공데이터 포털 API, 구군별 필터링
- **전기차 충전소**: 공공데이터 포털 API, 지역/종류별 필터링
- **부산 지하철 정보**: 역별 시간표 조회
- **할일 목록**: Supabase DB 연동 Todo 앱 (CRUD)
## 페이지 구성
```
/                    → GitHub OAuth 로그인
/lotto               → 로또 번호 생성기
/box                 → 영화 박스오피스
/gallery             → 관광지 갤러리
/festival            → 부산 축제 목록
/festival/contents   → 축제 상세
/ChargerInfo         → 전기차 충전소 목록
/ChargerInfo/detail  → 충전소 상세
/Subway              → 부산 지하철 정보
/todolist            → 할일 목록 (Supabase)
```
## 실행 방법
```bash
git clone https://github.com/kd256k/kdt03_react.git
cd kdt03_react
npm install
npm run dev
```
http://localhost:5173 에서 확인

> 로컬 실행 시 Vercel Serverless Functions가 동작하지 않습니다.
> 박스오피스 기능을 로컬에서 테스트하려면 `npm i -g vercel` 설치 후 `vercel dev`로 실행하세요.

## 환경변수
`.env` 파일을 생성하고 아래 항목을 설정하세요.
```
VITE_API_KEY=<공공데이터 포털 API 키>
VITE_MV_API=<KOBIS 영화 API 키>          # Vercel 대시보드 환경변수에도 등록 필요
VITE_TMDB_API=<TMDB API 키>              # Vercel 대시보드 환경변수에도 등록 필요
VITE_SUPABASE_URL=<Supabase 프로젝트 URL>
VITE_SUPABASE_KEY=<Supabase anon key>
```