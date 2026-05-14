# MIXXO 리오더 웹앱 배포

## Vercel 설정
- Framework Preset: Other 또는 Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 배포 방식
현재 로컬에서 확인하는 `standalone` 화면을 빌드 시 `dist` 폴더로 복사해 배포합니다.
Vercel에 GitHub 저장소를 연결하면 `main` 브랜치에 새로 올릴 때마다 공개 링크가 자동 갱신됩니다.

## 데이터
엑셀/CSV 또는 이후 Google Sheets CSV 연동 데이터는 브라우저 안에서 계산되며 서버에 저장하지 않습니다.
