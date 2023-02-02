import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'
import * as yup from 'yup';

const formSchema = yup.object().shape({
  newQuestion: yup
    .string()
    .trim()
    .min(2)
    .required(),
  newTrueAnswer: yup
    .string()
    .trim()
    .min(2)
    .required(),
  newFalseAnswer: yup
    .string()
    .trim()
    .min(2)
    .required(),
})

export function Form(props) {

  const checkValues = () => {
    if (props.form.newQuestion.trim() && props.form.newTrueAnswer.trim() && props.form.newFalseAnswer.trim()) {
      return false;
    } else {
      return true;
    }
  }

  const onChange = evt => {
    props.inputChange(evt);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    const formData = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer
    };
    props.postQuiz(formData);
    props.resetForm();
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={props.form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={props.form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={props.form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={checkValues()}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
