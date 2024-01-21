import {useSelector, useDispatch} from 'react-redux'
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterState = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch({
          type: 'VOTE',
          data: { id }
        })
      }

      //filters the 'anecdotes' state of anecdotes based on filter state. Set to lowercase for case-insensitive matching.
      const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterState.toLowerCase())
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList