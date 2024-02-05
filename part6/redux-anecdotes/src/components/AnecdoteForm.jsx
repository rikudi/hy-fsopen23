import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdotes from '../../services/anecdotes'



const AnecdoteForm = () => {
    //initialize dispatch hook and set it to a variable
    const dispatch = useDispatch()

    //log the state of the redux store
    const state = useSelector(state => state)
    console.log("Redux Store state: ", state)

    //event handler that adds new anecdote to redux store
    const AddAnecdote = async (event) => {
        event.preventDefault()
        console.log("Form submitted")
        const content = event.target.anecdote.value
        console.log("Content: ", content.payload)
        event.target.anecdote.value = ''
        //dispatch the createAnecdote action creator
        const newAnecdote = await anecdotes.createAnecdote(content)
        dispatch(createAnecdote(newAnecdote))
        //dispatch the setNotification action creator
        dispatch(setNotification(`You added '${content}'`, 5))
        //set notification to null after 5 seconds
        setTimeout(() => {
            dispatch(setNotification(null))
        }, 5000)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={AddAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm