# exam-planner

Version 1.0.0 | 2026-08-09

## 소개
시험공부 분량 자동 계산기는 대학생이 시험 준비를 효율적으로 관리할 수 있도록, 시험 과목과 공부 분량을 입력하면 남은 날짜에 맞춰 오늘 해야 할 학습량을 자동으로 계산해 주는 웹앱입니다. 단순한 정적 웹 애플리케이션으로 구현되어 별도 로그인이나 서버 없이도 바로 사용할 수 있으며, 학생들이 매일의 학습 부담을 시각적으로 이해하고 꾸준히 계획을 이어갈 수 있도록 만들었습니다.

## 데모
배포 URL: https://syseo0107.github.io/exam-planner/

## 주요 기능
- 시험 과목 이름, 시험 날짜, 총 공부 분량을 등록할 수 있습니다.
- 등록된 과목별로 D-Day와 남은 총 분량을 한눈에 확인할 수 있습니다.
- 오늘 해야 할 분량을 계산해 보여주며, 주말에는 평일 대비 낮은 가중치로 분배됩니다.
- 오늘의 분량을 완료 처리하면 남은 분량이 다시 계산되어 반영됩니다.
- 하루를 건너뛰면 남은 분량이 남은 날짜에 다시 분배되어 다음 계획이 자동으로 조정됩니다.
- 여러 과목을 동시에 등록하고 각각의 학습 계획을 개별적으로 관리할 수 있습니다.

## 기술 스택
- HTML
- CSS
- JavaScript
- localStorage 기반 브라우저 저장소
- GitHub Pages 정적 배포

## SDD 개발 프로세스
이 프로젝트는 SDD(문서 중심 개발) 흐름에 따라 설계와 구현을 진행했습니다.

- Constitution: [.specify/memory/constitution.md](.specify/memory/constitution.md)
- Spec: [specs/001-study-plan-calculator/spec.md](specs/001-study-plan-calculator/spec.md)
- Plan: [specs/001-study-plan-calculator/plan.md](specs/001-study-plan-calculator/plan.md)
- Tasks: [specs/001-study-plan-calculator/tasks.md](specs/001-study-plan-calculator/tasks.md)

## 향후 개선
- 더 직관적인 UI와 모바일 반응형 레이아웃을 추가해 사용성을 높이고 싶습니다.
- 완료 체크, 건너뛰기, 주말 가중치 계산 등 주요 동작을 더 세밀하게 검증하는 테스트 케이스를 확장하고 싶습니다.
- 저장된 데이터 복구 및 손상 복구 경험을 더 자연스럽게 개선해 안정성을 높이고 싶습니다.
- 과목별 통계, 목표 달성률, 학습 기록 시각화 같은 보조 기능을 추가해 계획 관리의 실용성을 강화하고 싶습니다.