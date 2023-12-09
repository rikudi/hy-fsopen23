const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                <p>name: <input className="input-field" value={newName} onChange={handleNameChange} placeholder='Add a new Name'/></p>
                <p>number: <input className="input-field" value={newNumber} onChange={handleNumberChange} placeholder='add a number'/></p>
            </div>
            <div>
                <button className="add-button" type="submit">Add</button>
            </div>
      </form>
    )
}

export default Form