import { useState } from 'react'
import Form from './components/form'
import Numbers from './components/numbers'
import Filter from './components/filter'

function App() {
  const [persons, setPersons] = useState([
  {id: 1, name: 'harry potter', number: '0451371899'},
  {id: 2, name: 'bilbo baggins', number: '0506932772'},
  {id: 3, name: 'sylvester stallone', number: '0445254443'},
  {id: 4, name: 'kimi raikkonen', number: '0403929786'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //event that handles adding a new person to the list
  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target)
    //create a new person object with name and id attributes that is concatenated to persons array
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    // Check if the name already exists in the list. a Boolean value stored to a constant nameExists.
    const dataExists = persons.some(person => person.name === personObject.name || person.number === personObject.number);
    //use the boolean as condition to set alert or concatinate
    if (dataExists) {
      alert(`${newName} or ${newNumber} is already on the list`);
    } else if(newNumber === '' || newName === ''){
      alert('Fill all fields before submitting')
    } 
    else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('')
    }
     console.log(persons)
  }
  //name change event handler that updates newName state variable everytime input field is modified
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  //same for numbers
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  //same for filter change
  const handleFilterChange = (event) => {
    console.log('filter value: ' + newFilter)
    setNewFilter(event.target.value)
  }

  //method that checks if the filtered name value exists on persons array. Case-insensitive.
  const personToShow = newFilter ? persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  return (
   <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <Form 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Numbers persons={personToShow} />
   </div>
  )
}

export default App
