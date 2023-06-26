import React from "react";
import { nanoid } from "nanoid"

export default function Question(props) {
  const { questionObject, resultsChecked } = props

  const variantsElements = questionObject.variantsOfAnswers.map(variant => {
    const correct = variant.answer === questionObject.correct_answer

    let styles = {}

    if (resultsChecked) {
      if (correct) {
        styles.backgroundColor = "#94D7A2"
        styles.border = "none"
      } else {
        // incorrect
        if(variant.isSelected) {
          styles.backgroundColor = "#F8BCBC"
          styles.border = "none"
        } else {
          styles.borderColor = "rgba(41, 50, 100, .5)"
          styles.color = "rgba(41, 50, 100, .5)"
        }
      }
    } else {
      //!resultsChecked
      styles.backgroundColor = variant.isSelected ? "#D6DBF5" : "transparent"
    }

    return (<div className="question__variant"
                 style={styles}
                 onClick={() => !resultsChecked && props.onAnswer(variant.id)}
                 key={variant.id}> {variant.answer} </div>)
  })


  return(
      <div className="question">
        <h3 className="question__text">{questionObject.question}</h3>
        <div className="question__variants">
          {variantsElements}
        </div>
      </div>
  )
}

