const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                <p>name: <input value={newName} onChange={handleNameChange} placeholder='Add a new Name'/></p>
                <p>number: <input value={newNumber} onChange={handleNumberChange} placeholder='add a number'/></p>
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
      </form>
    )
}

export default Form