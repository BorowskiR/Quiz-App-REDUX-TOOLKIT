import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    activeQuestion: 0,
    finished: false,
    questions: [
      {
        content: 'Co to jest React?',
        answers: [
          { id: 1, content: 'Framework Backendowy', checked: false, point: 0 },
          {
            id: 2,
            content: 'Biblioteka do budowy UI',
            checked: false,
            point: 1,
          },
          {
            id: 3,
            content: 'Framework do testowania',
            checked: false,
            point: 0,
          },
        ],
      },
      {
        content: 'Co to jest Redux?',
        answers: [
          { id: 1, content: 'Nie wiem', checked: false, point: 0 },
          {
            id: 2,
            content: 'Biblioteka do zarządzania stanem',
            checked: false,
            point: 1,
          },
          { id: 3, content: 'Server Node.js', checked: false, point: 0 },
        ],
      },
      {
        content: 'Co to jest Redux Toolkit?',
        answers: [
          {
            id: 1,
            content: 'Zestaw narzędzi ułatwiających pracę z Reduxem',
            checked: false,
            point: 1,
          },
          {
            id: 2,
            content: 'Narzędzia boba budowniczego',
            checked: false,
            point: 0,
          },
          {
            id: 3,
            content: 'Framework do testowania',
            checked: false,
            point: 0,
          },
        ],
      },
    ],
  },
  reducers: {
    next: (state) => {
      state.activeQuestion += 1;
    },
    toggle: (state, action) => {
      const question = state.questions[state.activeQuestion];
      console.log(question.content);
      console.log('toggle action', action.payload);
      question.answers[action.payload].checked = !question.answers[
        action.payload
      ].checked;
    },
    finished: (state) => {
      state.finished = true;
    },
  },
});

export const { next, toggle, finished } = quizSlice.actions;

// funkcja ktora zostatnie uzyta w hooku useSelector
export const selectQuestions = (state) => state.quiz.questions;

export const selectActive = (state) => state.quiz.questions;

export const selectActiveQuestion = (state) => state.quiz.activeQuestion;

export const quizFinished = (state) => state.quiz.finished;

export const selectMaxPoints = (state) => {
  let maxPoints = 0;

  state.quiz.questions.forEach((question) => {
    maxPoints += question.answers.filter((answer) => answer.point > 0).length;
  });

  return maxPoints;
};
export const selectPoints = (state) => {
  let points = 0;

  state.quiz.questions.forEach((question) => {
    points += question.answers.filter(
      (answer) => answer.point > 0 && answer.checked
    ).length;
  });

  return points;
};

export default quizSlice.reducer;
