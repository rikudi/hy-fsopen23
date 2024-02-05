import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//make backend generate id's for new anecdotes using asObject function

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // This is a custom action that we can use to vote for an anecdote
    vote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    // This is a custom action that we can use to create an anecdote and append it to the store
    createAnecdote: (state, action) => {
      console.log(state, action)
      const newAnecdote = asObject(action.payload)
      state.push(newAnecdote)
    },
    // This is a custom action that we can use to append an anecdote to the store
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    // This is a custom action that we can use to set the initial state of the store
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { vote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer