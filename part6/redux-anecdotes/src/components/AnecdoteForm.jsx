import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'



const AnecdoteForm = () => {
    //initialize dispatch hook and set it to a variable
    const dispatch = useDispatch()

    //event handler that adds new anecdote to redux store
    const AddAnecdote = (event) => {
        event.preventDefault()
        console.log("Form submitted")
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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