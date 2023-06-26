import React from "react";

export default function Intro(props) {
 return(
     <div className="intro">
      <h2 className="intro__title">Quizzical</h2>
      <p className="intro__description">Check how smart you are!</p>
      <button className="intro__quiz-btn" onClick={props.handleClick}>Start quiz</button>
     </div>
 )
}