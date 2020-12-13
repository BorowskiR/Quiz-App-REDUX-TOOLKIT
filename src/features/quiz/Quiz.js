import React from 'react';
import {
  selectActiveQuestion,
  selectQuestions,
  next,
  toggle,
  finished,
  quizFinished,
  selectMaxPoints,
  selectPoints,
} from './quizSlice';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const Quiz = () => {
  const activeQuestion = useSelector(selectActiveQuestion);
  const isFinished = useSelector(quizFinished);
  const questions = useSelector(selectQuestions);
  const maxPoints = useSelector(selectMaxPoints);
  const points = useSelector(selectPoints);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (isFinished) return;
    //   jezeli w tej tablicy jest index + 1
    if (questions[activeQuestion + 1]) {
      dispatch(next());
    } else {
      dispatch(finished());
    }
  };

  const handleToggle = (answerIndex) => () => {
    dispatch(toggle(answerIndex));
  };

  return (
    <div>
      {!isFinished && (
        <>
          <p>
            {activeQuestion + 1} / {questions.length}
          </p>
          <p>{questions[activeQuestion].content}</p>

          <List>
            {questions[activeQuestion].answers.map((answer, index) => (
              <ListItem dense button onClick={handleToggle(index)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={answer.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': answer.id }}
                  />
                </ListItemIcon>
                <ListItemText id={answer.id} primary={answer.content} />
              </ListItem>
            ))}
          </List>

          <Button color="primary" onClick={handleNext}>
            Next
          </Button>
        </>
      )}

      {isFinished && (
        <>
          <b>
            Twój wynik to: {points} / {maxPoints}
          </b>
        </>
      )}
    </div>
  );
};

export default Quiz;
