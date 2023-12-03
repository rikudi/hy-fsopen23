import { useState, useEffect } from 'react'
import Form from './components/form'
import Numbers from './components/numbers'
import Filter from './components/filter'
import personsService from './services/personsService'
import Notification from './components/alerts'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('')

  //fetch function for fetching data
  const fetchPersons = () => {
    personsService.getAll()
      .then(response => {
        setPersons(response.data);
        console.log('data fetched from server')
      })
      .catch(error => {
        console.error('Error fetching persons', error);
        // Handle fetch error, e.g., set an error message
      });
  }

  //Effect hook for fetching data from json server
  useEffect(() => {
    console.log('effect')
    fetchPersons()
  }, [])
  console.log('render', persons.length, 'persons')

//////////////////////////////////////////////////////////////
  //
  //ADD PERSON
  //
  const addPerson = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target)

    //create a new person object with name and id attributes that is concatenated to persons array
    const personObject = {
      name: newName,
      number: newNumber
    }

    // Check if the name already exists on the list. a Boolean value stored to a constant nameExists.
    const existingPerson = persons.find(person => person.name === personObject.name || person.number === personObject.number);
    
    /*if conditions are met, -using axios (personsService)-
    the new person object is added or updated to json server */
    if (existingPerson && newNumber != existingPerson.number) {
      console.log("id " + existingPerson.id)
      const confirmUpdate = window.confirm(`${newName} is already on the list, would you like to update the number?`)
      if(confirmUpdate) {
        const updatedPerson = {...existingPerson, number: newNumber}

        personsService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
          setNewName('')
          setNewNumber('')
          setAlertMessage(`${updatedPerson.name} updated`)
          
          //fetch and render persons after 5 seconds
          setTimeout(() => {
            setAlertMessage(null)
            fetchPersons()
          }, 5000)
        })
        .catch(error => {
          console.error('Error updating person data', error)
          setAlertMessage(
            `Error: ${existingPerson.name} already removed from server`
          )
          setAlertType('error')
          setTimeout(() => {
            setAlertMessage(null)
            fetchPersons()
          }, 5000)

        })
      }
    }
    //check if name and number already exist
    else if(existingPerson && newNumber == existingPerson.number) {
      alert("Person with same name and number already in use")
      setNewName('')
      setNewNumber('')
    }
    //check if fields are empty
    else if(newNumber === '' || newName === ''){
      alert('Fill all fields before submitting')
    } 
    else {
      personsService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setAlertMessage(`${personObject.name} added to the phonebook!`)
        setAlertType('success')
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
        fetchPersons()
      })
      .catch(error => {
        console.error('Error adding person ', error)
      })
    }
     console.log(persons)
  }

/////////////////////////////////////////////////////////////
  //
  //DELETE PERSON
  //
  const deletePerson = id => {
    console.log("delete button clicked")
    const personToDelete = persons.find(p => p.id === id)
    console.log("person to delete id found from browser")
    if (!personToDelete) return;

    const confirmDeletion = window.confirm(`Delete ${personToDelete.name}`)
    //if confirmDeletion returns true, proceed deleting the person from database 
    if(confirmDeletion) {
      console.log('deletion confirmed')
      personsService.deletePerson(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setAlertMessage(`${personToDelete.name} removed from the phonebook!`)
        setAlertType('error')
        setTimeout(() => {
          setAlertMessage(null)
        }, 5000)
        fetchPersons()
      })
      .catch (error => {
        console.error("error deleting person", error)
      })
    }
  }

/////////////////////////////////////////////////////////////
  //
  /* EVENT HANDLERS */
  //

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
/////////////////////////////////////////////////////////////////////////////////

  return (
   <div>
      <h1>Phonebook</h1>
      <Notification message={alertMessage} type={alertType}/>
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
      <Numbers persons={personToShow} onDelete={deletePerson} />
   </div>
  )
}

export default App
