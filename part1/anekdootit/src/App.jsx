import React, { useState } from 'react'

function App() {
  const anecdotes = [    
  {text: 'If it hurts, do it more often.', votes: 0},
  {text: 'Adding manpower to a late software project makes it later!', votes: 0},
  {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
  {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
  {text: 'Premature optimization is the root of all evil.', votes: 0},
  {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0},
  {text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.', votes: 0},
  {text:'The only way to go fast, is to go well.', votes: 0 }
]
  const [newAnecdotes, setNewAnecdotes] = useState(anecdotes)
  const [selected, setSelected] = useState(0)

  console.log(newAnecdotes)

  //handles the randomizing based on the length of the anecdotes array
  const clickHandler = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  // handles the voting
  const voteHandler = () => {
    setNewAnecdotes((prevAnecdotes) => {
      // create a local clone of anecdotes array using spread operator
      const updatedAnecdotes = [...prevAnecdotes];
      // create a new object at the index 'selected' and increment vote by 1
      updatedAnecdotes[selected] = {
        ...updatedAnecdotes[selected],
        votes: updatedAnecdotes[selected].votes + 1,
      };
      return updatedAnecdotes;
    });
  };
  /*Iterate through newAnecdotes array checking if the previous index votes are lower than votes on current index
    if so, set the current index vote count as mostVoted. Initial value is index 0 of anecdotes array */
  const mostVoted = newAnecdotes.reduce((prev, current) => (prev.votes > current.votes ? prev : current), anecdotes[0]);

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{newAnecdotes[selected].text}</p>
        <p>{newAnecdotes[selected].votes}</p>
        <button onClick={() => clickHandler()}>Next anecdote</button>
        <button onClick={() => voteHandler()}>Vote</button>
      </div>
        <h1>Most voted anecdote</h1>
        {mostVoted.votes > 0 ? (
          <p>{mostVoted.text} <strong>{mostVoted.votes} votes</strong></p>
        ): "No votes yet"}

      </div>
  )
}

export default App
