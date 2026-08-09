# Tasks: 시험공부 분량 자동 계산기

**Input**: Design documents from `/specs/001-study-plan-calculator/`

**Prerequisites**: plan.md, spec.md

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 빈 프로젝트 스켈레톤 파일 생성: `index.html`, `style.css`, `app.js`, `test.html`
- [x] T002 입력 폼, 과목 목록, 오늘 요약 섹션을 포함한 기본 HTML 골격을 `index.html`에 추가
- [x] T003 폼과 요약 섹션 자리 표시자를 포함한 기본 스타일 시트 `style.css`를 추가
- [x] T004 브라우저에서 실행할 테스트와 초기 결과 표시를 위한 스크립트 영역을 `test.html`에 추가

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T005 [P] `app.js`에 `id`, `name`, `examDate`, `totalVolume`, `remainingVolume`, `completedToday` 필드를 갖는 공부 과목 데이터 모델 정의
- [x] T006 [P] `app.js`에 localStorage에서 과목 데이터를 저장하고 복원하는 헬퍼 함수 구현
- [x] T007 [P] `app.js`에 과목 이름, 시험 날짜, 총 공부 분량에 대한 입력 검증 유틸리티 구현
- [x] T008 [P] `app.js`에 로컬 D-Day를 계산하고 자정 경계 케이스를 처리하는 날짜 유틸리티 구현
- [x] T009 [P] `index.html`에 공통 오류 표시 영역 추가 및 `app.js`에서 한국어 검증 메시지 연결
- [x] T010 [P] 여러 과목과 오늘 학습량 요약을 표시할 자리 표시자 UI 섹션을 `index.html`에 추가

---

## Phase 3: User Story 1 - 시험 계획 등록 및 확인 (Priority: P1) 🎯 MVP

**Goal**: 학생이 시험 과목과 시험 날짜, 총 공부 분량을 등록하고 등록된 과목 목록에서 D-Day와 남은 분량을 확인할 수 있다.

**Independent Test**: 등록 폼에 값을 입력하고, 등록된 과목이 목록과 요약에 표시되는지 확인한다.

### Tests for User Story 1

- [x] T011 [P] [US1] `test.html`에 과목 등록 검증과 저장 동작을 확인하는 브라우저 테스트 추가
- [x] T012 [P] [US1] `test.html`에 D-Day 계산과 남은 분량 표시를 확인하는 브라우저 테스트 추가

### Implementation for User Story 1

- [x] T013 [US1] `app.js`에서 과목 등록 폼 처리 로직을 구현하고 데이터를 `localStorage`에 저장
- [x] T014 [US1] `index.html`에 등록된 과목을 D-Day와 남은 분량과 함께 렌더링하는 기능을 `app.js`에 구현
- [x] T015 [US1] 등록 입력이 잘못된 경우 `index.html`에 한국어 검증 메시지를 표시
- [x] T016 [US1] 페이지 로드 시 `localStorage`에서 등록된 과목 데이터를 복원하도록 구현

---

## Phase 4: User Story 2 - 오늘 해야 할 분량 확인 (Priority: P1)

**Goal**: 학생이 오늘 기준으로 D-Day와 오늘 해야 할 분량을 한눈에 볼 수 있다.

**Independent Test**: 오늘 화면에서 각 과목의 오늘 분량과 D-Day가 올바르게 표시되는지 확인한다.

### Tests for User Story 2

- [ ] T017 [P] [US2] `test.html`에 오늘 분량 계산과 표시를 검증하는 브라우저 테스트 추가
- [ ] T018 [P] [US2] `test.html`에 주말 절반 분배를 검증하는 브라우저 테스트 추가

### Implementation for User Story 2

- [ ] T019 [US2] `index.html`에 오늘 요약 섹션 렌더링 기능 구현
- [ ] T020 [US2] `app.js`에 남은 날짜와 남은 분량을 이용한 오늘 분량 계산 로직 구현
- [ ] T021 [US2] 과목 등록 후와 페이지 로드 시 오늘 분량 요약이 갱신되도록 구현

---

## Phase 5: User Story 3 - 완료 체크 및 분량 재계산 (Priority: P2)

**Goal**: 학생이 오늘 할당된 분량을 완료 체크하면 남은 분량이 재계산되어 반영된다.

**Independent Test**: 완료 체크 후 남은 분량과 오늘 분량이 즉시 업데이트되는지 확인한다.

### Tests for User Story 3

- [ ] T022 [P] [US3] `test.html`에 완료 체크 후 재계산 동작을 검증하는 브라우저 테스트 추가

### Implementation for User Story 3

- [ ] T023 [US3] `index.html`에 각 과목별 완료 체크박스 UI 추가
- [ ] T024 [US3] `app.js`에 완료 처리 핸들러를 구현하여 `remainingVolume`을 수정하고 상태를 저장
- [ ] T025 [US3] 완료 체크 처리 후 오늘 학습량과 과목 요약을 즉시 갱신하도록 구현

---

## Phase 6: User Story 4 - 일시 중단 시 재분배 (Priority: P2)

**Goal**: 학생이 하루를 건너뛰면 남은 분량을 남은 날짜에 다시 분배한다.

**Independent Test**: 하루를 건너뛰고 다음 날 앱을 열었을 때 분량이 재분배되어 표시되는지 확인한다.

### Tests for User Story 4

- [ ] T026 [P] [US4] `test.html`에 하루 건너뛰기 후 재분배 로직을 검증하는 브라우저 테스트 추가

### Implementation for User Story 4

- [ ] T027 [US4] `app.js`에 건너뛴 날을 감지하고 남은 분량을 재분배하는 로직 구현
- [ ] T028 [US4] 재분배 후 오늘 학습량 계산과 렌더링을 갱신하도록 구현

---

## Phase 7: User Story 5 - 여러 과목 동시 관리 (Priority: P2)

**Goal**: 학생이 여러 과목을 동시에 등록하고 각 과목을 별도로 관리할 수 있다.

**Independent Test**: 여러 과목을 등록한 뒤 각 과목의 D-Day와 오늘 분량이 개별적으로 표시되는지 확인한다.

### Tests for User Story 5

- [ ] T029 [P] [US5] `test.html`에 여러 과목 동시 등록 및 표시를 검증하는 브라우저 테스트 추가

### Implementation for User Story 5

- [ ] T030 [US5] `index.html`에 여러 과목 항목을 렌더링하는 기능 구현
- [ ] T031 [US5] `app.js`가 각 과목을 `localStorage`에 독립적으로 저장하고 계산하도록 구현
- [ ] T032 [US5] 페이지 새로고침 후에도 여러 과목 데이터가 분리되어 유지되는지를 확인

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 전반적인 완성도 향상 및 추가적인 거버넌스 항목 반영

- [ ] T033 [P] `index.html`과 `app.js`에 비현실적으로 큰 하루 분량에 대한 안내 문구 추가
- [ ] T034 [P] `app.js`에 localStorage 손상 처리 및 초기화 옵션 구현
- [ ] T035 [P] `style.css`에 폼, 요약, 과목 목록의 가독성을 위한 기본 스타일 추가
- [ ] T036 [P] `test.html`에 시험일이 오늘인 경우, 과거인 경우, 자정 경계, 비현실적 분량에 대한 엣지 케이스 테스트 추가
- [ ] T037 [P] `app.js`, `index.html`, `style.css`의 단순성과 유지보수성을 위해 검토 및 정리
- [ ] T038 [P] 브라우저에서 앱이 정상 동작하는지 확인하고 GitHub Pages 배포용 파일 준비

---

## Dependencies & Execution Order

- Phase 1 Setup must complete before Phase 2 Foundational begins.
- Phase 2 Foundational must complete before User Stories in Phase 3+ begin.
- User Story phases may proceed in priority order with independent testing after each story.
- Phase 8 Polish may begin once all user story implementation tasks are complete.

## Parallel Opportunities

- T005, T006, T007, T008, T009, T010 can run in parallel because they are foundational and affect separate concerns.
- T011/T012, T017, T021, T025, T028 are parallelizable within test preparation and validation tasks.
- T032, T033, T034, T035, T036, T037 can run in parallel as cross-cutting polish tasks.
