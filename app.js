const STORAGE_KEY = 'examPlannerSubjects';

const subjectForm = document.getElementById('subject-form');
const subjectNameInput = document.getElementById('subject-name');
const examDateInput = document.getElementById('exam-date');
const totalVolumeInput = document.getElementById('total-volume');
const errorMessage = document.getElementById('error-message');
const subjectList = document.getElementById('subject-list');
const todaySummary = document.getElementById('today-summary');

function loadSubjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const subjects = JSON.parse(raw);
    return Array.isArray(subjects) ? subjects : [];
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

function saveSubjects(subjects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

function getTodayDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function calculateDaysRemaining(examDateString) {
  const examDate = new Date(examDateString);
  const today = getTodayDate();
  const diffDays = Math.floor((examDate - today) / (1000 * 60 * 60 * 24));
  return diffDays;
}

function validateInput(name, examDate, totalVolume) {
  if (!name.trim()) {
    return '과목 이름을 입력해주세요.';
  }

  if (!examDate) {
    return '시험 날짜를 선택해주세요.';
  }

  const exam = new Date(examDate);
  const today = getTodayDate();

  if (isNaN(exam.getTime())) {
    return '유효한 시험 날짜를 입력해주세요.';
  }

  if (exam < today) {
    return '시험일은 오늘 이후여야 합니다.';
  }

  if (!totalVolume || Number(totalVolume) <= 0) {
    return '총 공부 분량은 1 이상이어야 합니다.';
  }

  return null;
}

function renderSubjects(subjects) {
  subjectList.innerHTML = '';

  if (subjects.length === 0) {
    subjectList.innerHTML = '<p>등록된 과목이 없습니다.</p>';
    return;
  }

  subjects.forEach((subject) => {
    const card = document.createElement('div');
    card.className = 'subject-card';

    const subjectName = document.createElement('h3');
    subjectName.textContent = subject.name;

    const dDay = calculateDaysRemaining(subject.examDate);
    const dDayText = dDay === 0 ? 'D-Day 0' : `D-${dDay}`;

    const volumeText = document.createElement('p');
    volumeText.textContent = `남은 분량: ${subject.remainingVolume} 단위`; 

    const examText = document.createElement('p');
    examText.textContent = `시험 날짜: ${subject.examDate} (${dDayText})`;

    card.appendChild(subjectName);
    card.appendChild(examText);
    card.appendChild(volumeText);
    subjectList.appendChild(card);
  });
}

function renderTodaySummary(subjects) {
  todaySummary.innerHTML = '';

  if (subjects.length === 0) {
    todaySummary.innerHTML = '<p>오늘 확인할 과목이 없습니다.</p>';
    return;
  }

  subjects.forEach((subject) => {
    const row = document.createElement('div');
    row.className = 'summary-item';

    const dDay = calculateDaysRemaining(subject.examDate);
    const todayVolume = Math.max(
      Math.ceil(subject.remainingVolume / (dDay + 1)),
      0
    );
    const dDayText = dDay === 0 ? 'D-Day 0' : `D-${dDay}`;

    row.textContent = `${subject.name}: ${dDayText}, 오늘 공부할 분량 ${todayVolume} 단위`; 
    todaySummary.appendChild(row);
  });
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = '';
}

subjectForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = subjectNameInput.value;
  const examDate = examDateInput.value;
  const totalVolume = totalVolumeInput.value;

  const validationError = validateInput(name, examDate, totalVolume);
  if (validationError) {
    showError(validationError);
    return;
  }

  clearError();

  const subjects = loadSubjects();
  const remainingVolume = Number(totalVolume);
  const newSubject = {
    id: Date.now().toString(),
    name: name.trim(),
    examDate,
    totalVolume: Number(totalVolume),
    remainingVolume,
    completedToday: false,
  };

  subjects.push(newSubject);
  saveSubjects(subjects);
  renderSubjects(subjects);
  renderTodaySummary(subjects);
  subjectForm.reset();
});

const subjects = loadSubjects();
renderSubjects(subjects);
renderTodaySummary(subjects);
