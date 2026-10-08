# 이지현 포트폴리오

정적 HTML/CSS/JS 포트폴리오 사이트입니다. GitHub Pages로 배포합니다.

## 구조

```
index.html             메인 (Hero / About / Work / Contact)
projects/project-01.html  프로젝트 상세 페이지 템플릿
css/style.css          스타일 (라이트/다크 모드, 모바일 대응)
js/main.js             모바일 메뉴, 작업 필터
images/                프로필(profile.jpg), 썸네일(work-01.jpg ...)
```

## 수정 방법

- 프로필 사진: `images/profile.jpg`로 저장
- 작업 추가: `index.html`의 `.card` 하나를 복사하고 `data-category`, 제목, 썸네일 경로를 수정
- 상세 페이지: `projects/project-01.html`을 복사해 새 파일로 만들고 카드의 링크를 연결
- 필터 분류: `index.html`의 `.filter` 버튼 `data-filter` 값과 카드의 `data-category` 값을 맞추기
