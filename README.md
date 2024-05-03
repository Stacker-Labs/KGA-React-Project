# <a link="https://eunjae.store/">KGA-React-Project (Stacker Labs) </a>
<img src="https://github.com/Stacker-Labs/KGA-React-Project/assets/138093994/9e3c238d-9c39-4b8b-9f69-e002db7fa36c" />

# 목차
- 개요
- 사용 기술
- 주요 기능

---

## 개요
- ### 배포 주소 : https://stacker-labs.vercel.app/
- dev.to를 모티브로 제작한 개발자 커뮤니티
- 기간 : 2023.12 ~ 2024.01
- 팀원 :
  - 강수빈 : Backend (NestJS를 사용하여 구현/배포)
  - 김보람 : Frontend (React를 사용하여 main, search, tags, admin page)
  - 박상현 : Frontend (React를 사용하여 Board CRUD)
  - 이은재 : 팀장, Frontend (React를 사용하여 User CRUD)

---

## 사용 기술
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/> <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/> 

<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"/> <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>

- 리액트를 사용하여 레이아웃 디자인, 컴포넌트 조립, 상태 관리, 통신, 배포(CI/CD)
- recoil persist를 사용하여 유저 정보, 메뉴 토글, 다크 모드의 상태를 localStorage에 저장함
- 반복되는 hooks와 로직을 캡슐화 (custom hooks)

---

## 주요 기능
- 로그인 로컬 / 소셜(Github, Google, Kakao)
- 게시글 작성 및 수정, 삭제
- 무한 스크롤
- 게시글 검색 기능
- 게시글 내에 **#(태그)** 카테고리
- 다크 모드
- socket.io를 활용한 실시간 채팅
- 관리자 페이지
- 모바일, 노트북, 데스크탑 반응형


