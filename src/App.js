import { useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [subjects, setSubjects] = useState([
    {credit0: "", gradePoint0: ""},
  ])
  const [count, setCount] = useState(1)
  const [computedResults, setComputedResults] = useState(null)

  function handleChangeInput(e, idx) {
    subjects[idx][e.target.name] = e.target.value
  }

  function handleAddInputField() {
    let newSubject = {}
    let newCredit = generateNewCredit()
    let newGradePoint = generateNewGradePoint()
    newSubject[newCredit] = "";
    newSubject[newGradePoint] = "";
    setCount(count+1)
    setSubjects([...subjects, newSubject])
  }

  function generateNewCredit() {
    return `credit${subjects.length}`
  }

  function generateNewGradePoint() {
    return `gradePoint${subjects.length}`
  }

  function generateNewCreditPoints(idx) {
    return `creditPoints${idx}`
  }

  function handleRemoveInputField(idx) {
    let values = [...subjects]
    // console.log(idx)
    values.splice(idx, 1)
    setSubjects(values)
    setCount(count-1)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // console.log(subjects)
    computeCgpa()
  }

  // computes CGPA score
  function computeCgpa() {
    const computedSubjects = subjects.map(function (subject, idx) {
      const newCreditPoints = generateNewCreditPoints(idx)
      const creditPoints = subject[`credit${idx}`] * subject[`gradePoint${idx}`]
      const newComputedSubject = {...subject}
      newComputedSubject[newCreditPoints] = creditPoints
      return newComputedSubject
    })

    // console.log(computedSubjects)

    let totalCredits = computedSubjects.map((subject, idx) => subject[`credit${idx}`]).reduce((prev, next) => Number(prev) + Number(next))
    let totalCreditPoints = computedSubjects.map((subject, idx) => subject[`creditPoints${idx}`]).reduce((prev, next) => Number(prev) + Number(next))
    let cgpa = totalCreditPoints/totalCredits

    let results = {
      totalCredits,
      totalCreditPoints,
      cgpa
    }

    setComputedResults(results)

    // console.log(totalCredits, totalCreditPoints, cgpa)
  }

  // console.log(computedResults)

  return (
    <div className="App">
      <Header/>
      <form onSubmit={(e) => handleSubmit(e)}>
        {
          subjects.map((subject, idx) => (
            <div key={idx}>
              <h2>{`Subject-${idx+1}`}</h2>
              <input placeholder={`Credit${idx+1}`} name={`credit${idx}`} onChange={(e) => handleChangeInput(e, idx)} value={subject.credits} type='number'/>
              <input placeholder={`Grade Point${idx+1}`} name={`gradePoint${idx}`} onChange={(e) => handleChangeInput(e, idx)} value={subject.gradePoint} type='number'/>
              <button className='button-add' disabled={idx+1 === count ? false : true} onClick={() => handleAddInputField()}>+</button>
              <button className='button-remove' disabled={idx+1 === count ? false : true} onClick={() => handleRemoveInputField(idx)}>-</button>
            </div>
          ))
        }
        <button className='button-cgpa' type='submit'>Compute CGPA</button>
      </form>
      {computedResults !== null ? 
      (<div className='computed-results'>
        <p>Total Credits = {computedResults.totalCredits}</p>
        <p>Total CreditPoints = {computedResults.totalCreditPoints}</p>
        <p>CGPA = {computedResults.cgpa}</p>
      </div>) : ""}
    </div>
  );
}

export default App;
