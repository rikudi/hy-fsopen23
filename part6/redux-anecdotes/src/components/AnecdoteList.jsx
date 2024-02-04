import {useSelector, useDispatch} from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterState = useSelector(state => state.filter)
    const dispatch = useDispatch()
    console.log("Anecdotes: ", anecdotes)

    const handleVote = (id) => {
        dispatch(vote(id))
        console.log("Voted for: ", id)
        //dispatch the setNotification action creator
        dispatch(setNotification(`You voted for '${anecdotes.find(anecdote => anecdote.id === id).content}'`, 5))
        //set notification to null after 5 seconds
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
    }
      //filters the 'anecdotes' state of anecdotes based on filter state. Set to lowercase for case-insensitive matching.
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
      !filterState || anecdote.content.toLowerCase().includes(filterState.toLowerCase()) // If filterState is empty, return all anecdotes. Else return anecdotes that match filterState
    )
      
    return(
    <div>
        {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList