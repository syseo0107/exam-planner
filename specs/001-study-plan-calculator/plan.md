# Implementation Plan: 시험공부 분량 자동 계산기

**Branch**: `001-study-plan-calculator` | **Date**: 2026-08-09 | **Spec**: `/specs/001-study-plan-calculator/spec.md`

**Input**: Feature specification from `/specs/001-study-plan-calculator/spec.md`

## Summary

이 기능은 대학생이 시험 과목별 공부 분량과 시험 날짜를 입력하면, 남은 날짜에 맞춰 오늘 공부해야 할 분량을 자동으로 계산해 주는 정적 웹앱을 구현하는 계획이다. 순수 HTML/CSS/JavaScript로 구성하며, 데이터는 브라우저의 localStorage에 저장한다. constitution에 정의된 에러 처리 우선, 테스트 우선, 날짜/시간 처리 주의, 단순함 유지 원칙을 반영하여 설계한다.

## Technical Context

**Language/Version**: 순수 HTML/CSS/JavaScript (브라우저 호환 표준)

**Primary Dependencies**: 없음 (외부 라이브러리/프레임워크 없음)

**Storage**: localStorage

**Testing**: 브라우저에서 실행 가능한 `test.html` 방식의 단순 테스트 페이지

**Target Platform**: 현대 브라우저 (데스크톱/노트북)

**Project Type**: 웹 애플리케이션 (정적)

**Performance Goals**: 페이지 로드와 계산이 즉시 응답해야 함; 단일 브라우저 세션에서 수십 개 과목까지 원활히 동작

**Constraints**: 백엔드나 서버 없음; 모든 동작은 클라이언트에서 수행; 데이터는 localStorage로만 저장; UI와 로직은 간단하고 명확해야 함

**Scale/Scope**: 개인용 시험 계획 도구, 다중 과목 지원, 로그인/회원 기능 제외

## Constitution Check

- 에러 처리 우선: 모든 입력은 앱 내에서 검증해야 하며, 실패 시 한국어 메시지를 보여준다.
- 테스트 우선: 핵심 계산 로직과 날짜 경계 처리는 `test.html`에서 먼저 검증하는 형태로 설계한다.
- 날짜/시간 처리 주의: 로컬 시간대와 자정 경계를 고려하여 D-Day와 오늘 분량 계산을 수행한다.
- 단순함 유지: 프레임워크 없이 정적 파일로 구성하고 localStorage만 사용한다.

이 계획은 위 원칙에 부합하며, 추가적인 거버넌스 위반 사항은 없다.

## Project Structure

### Documentation (this feature)

```text
specs/001-study-plan-calculator/
├── spec.md
└── plan.md
```

### Source Code (repository root)

```text
index.html
style.css
app.js
test.html
```

**Structure Decision**: 단일 정적 웹앱으로 구성하며, 문서와 구현 파일 모두 루트에 위치한다. 스펙 단계에서는 최소한의 폴더를 사용하여 프로젝트 구조를 최대한 단순하게 유지한다.

## Implementation Plan

### 1. UI 및 입력 흐름

- 사용자 입력 폼을 `index.html`에 구현한다.
- 각 시험 과목에 대해 과목 이름, 시험 날짜, 총 공부 분량을 입력할 수 있도록 한다.
- 입력 오류가 발생할 경우 즉시 한국어 오류 메시지를 표시하고 저장을 차단한다.
- 등록된 과목 목록과 함께 오늘 D-Day, 오늘 할 분량, 전체 남은 분량을 표시한다.

### 2. 데이터 모델 및 저장

- `app.js`에서 과목 정보를 객체 배열로 관리한다.
- 각 과목은 `id`, `name`, `examDate`, `totalVolume`, `remainingVolume`, `completedToday` 등의 필드를 가진다.
- 상태는 `localStorage`에 JSON 문자열로 저장하며, 페이지 로드 시 복원한다.
- localStorage가 손상된 경우 기본값으로 초기화하고 사용자에게 안내한다.

### 3. 계산 로직

- 남은 날짜 계산은 사용자의 로컬 시간대 기준으로 수행한다.
- 오늘 포함 여부를 명확히 정의하며, 시험일이 오늘인 경우 D-Day 0으로 처리하고 오늘 필요한 분량을 표시한다.
- 시험일이 과거인 경우 등록을 차단하거나 경고하고 계산을 중단한다.
- 하루를 건너뛰면 남은 분량을 남은 날짜에 다시 분배하고 오늘 분량을 재계산한다.
- 분량이 비현실적으로 클 때는 사용자 안내 메시지를 추가로 표시한다.

### 4. 완료 체크 및 재계산

- 사용자는 오늘 할당된 분량을 완료 체크할 수 있다.
- 체크 시 해당 과목의 `remainingVolume`을 업데이트하고, 남은 날짜 기준으로 다시 분배한다.
- 완료 체크 정보는 localStorage에 함께 저장한다.

### 5. 테스트 전략

- `test.html`을 작성하여 계산 로직과 입력 검증을 검증한다.
- 테스트 항목에는 D-Day 계산, 자정 경계, 오늘 완료 체크, 하루 건너뛰기 재분배, 과거 시험일 입력 처리, 비현실적 분량 표시가 포함된다.
- `test.html`은 브라우저에서 직접 열어 실행할 수 있는 단순 자바스크립트 테스트 페이지로 구현한다.

### 6. 배포

- 결과 파일 `index.html`, `style.css`, `app.js`, `test.html`을 GitHub Pages로 배포한다.
- 배포 전에 `index.html`이 로컬에서 정상 동작하는지 확인한다.

## Risk & Mitigation

- **localStorage 용량 또는 데이터 손상**: 저장값 검증 로직을 두고 손상 시 초기화 안내를 제공한다.
- **자정 경계 오류**: 로컬 날짜 계산을 중심으로 테스트 케이스를 설계하여 오전 0시 직전/직후 시나리오를 검증한다.
- **사용자 입력 오류**: 모든 필드를 필수로 처리하고 음수/빈 값 입력을 차단한다.

## Next Steps

1. `test.html` 기반 테스트 케이스를 먼저 작성하여 핵심 로직을 검증한다.
2. `index.html`, `style.css`, `app.js`를 간단한 초기 프로토타입으로 구현한다.
3. localStorage 저장 및 복원, 날짜 계산, 완료 체크 흐름을 순차적으로 완성한다.
4. 로컬 브라우저에서 동작 검증 후 GitHub Pages 배포 준비를 진행한다.
