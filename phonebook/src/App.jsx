import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  
  const addPerson = (event) => {
  event.preventDefault()

  const existingPerson = persons.find(
    p => p.name === newName
  )

  // CASE 1: person exists → update number
  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook. Replace the old number with a new one?`
    )

    if (!confirmUpdate) return

    const updatedPerson = {
      ...existingPerson,
      number: newNumber
    }

    personService
      .update(existingPerson.id, updatedPerson)
      .then(response => {
        setPersons(
          persons.map(p =>
            p.id !== existingPerson.id ? p : response.data
          )
        )

        setNewName('')
        setNewNumber('')
      })

    return
  }

  // CASE 2: new person → create
  const personObject = {
    name: newName,
    number: newNumber
  }

  personService
    .create(personObject)
    .then(response => {
      setPersons(prev => prev.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
}

  // HANDLERS
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      
<Persons
  personsToShow={personsToShow}
  deletePerson={deletePerson}
/>
    </div>
  )
}
const deletePerson = (id) => {
  const person = persons.find(p => p.id === id)

  const confirmDelete = window.confirm(
    `Delete ${person.name}?`
  )

  if (confirmDelete) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }
}

export default App