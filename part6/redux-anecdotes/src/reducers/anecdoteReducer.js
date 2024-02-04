import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    createAnecdote: (state, action) => {
      console.log(state, action)
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    }
  }
})

export const { vote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

/*
const reuducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)

      if (anecdoteToVote) {
        console.log('anecdote to vote: ' + anecdoteToVote.id)
        const updatedAnecdotes = state.map((anecdote) => 
        anecdote.id === id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
        return updatedAnecdotes
      }
      return state
    }
    case 'NEW_ANECDOTE': {
      //add the new anecdote to the state
      return [...state, action.payload];
    }
      default:
        return state
  }
}

*/