import React from "react"
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";

export default function App() {

  const [page, setPage] = React.useState("intro");

  function startQuiz() {
    setPage("quiz page")
  }

  return(
      <div className="page">
        { page === "intro" ? <Intro handleClick={startQuiz}/> : <Quiz /> }
      </div>
  )
}

