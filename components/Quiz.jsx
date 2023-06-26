import React from "react";
import Question from "./Question";

export default function Quiz() {
  const [questions, setQuestions] = React.useState([]);
  const [resultsChecked, setResultsChecked] = React.useState(false);

  React.useEffect(() => loadQuiz(), [])

  function loadQuiz() {
    setResultsChecked(false)
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then(res => res.json())
        .then(data => {
          setQuestions(
              data.results.map((q, qIndex) => {
                return {
                  ...q,
                  id: qIndex,
                  variantsOfAnswers: shuffleArray([
                    ...q.incorrect_answers,
                    q.correct_answer,
                  ]).map((answer, index) => {
                    return {
                      answer,
                      id: index,
                      isSelected: false
                    }
                  })
                }
              })
          )
        })
  }

  const questionElements = questions.map(question => {

    function selectAnswer(variantId){
      setQuestions(questions.map(q => {
        if (q.id === question.id) {
          q.variantsOfAnswers = q.variantsOfAnswers.map(v => {
            return {
              ...v,
              isSelected: v.id === variantId
                  ? !v.isSelected
                  : false
            }
          })
        }
        return q
      }))
    }

    return <Question
        questionObject={question}
        key={question.id}
        onAnswer={selectAnswer}
        resultsChecked={resultsChecked}
    />
  })

  function checkResults() {
    setResultsChecked(true)
  }

  const buttonEnabled = questions.every(q => q.variantsOfAnswers.some(v => v.isSelected))

  const button = resultsChecked ? (
      <button className="bottom__button" onClick={loadQuiz}>Play again</button>
  ) : (
      <button className="bottom__button" disabled={!buttonEnabled} onClick={checkResults}>Check results</button>
  )

  const count = questions.filter(q => q.variantsOfAnswers.find(v => v.isSelected)?.answer === q.correct_answer).length

  return(
      <div className="quiz">
        {questionElements}
        <div className="bottom">
          {resultsChecked && <span>{`You scored ${count}/5 correct answers`}</span>}
          {button}
        </div>
      </div>

  )
}

function shuffleArray (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr
}
