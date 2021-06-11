import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setNewMessage ] = useState(null)


  useEffect(() => {    
  console.log('toimi ennen axiosta')    
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
        console.log('lisäys toimi')
      })
  }, [])

  const addPerson = (event) => {

    event.preventDefault()

    if (persons.find(person => person.name === newName)){
      const id = persons.find(person => person.name === newName).id
      if (window.confirm(`${newName} is already added to phonebook, do you want to change the number?`)) {

      const personObject = {
        name : newName,
        number : newNumber,
        id: id
        }

      modifyPerson(personObject)

    }
    } else {

    const personObject = {
    name : newName,
    number : newNumber
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNewMessage('lisäys onnistui')
        setTimeout(() => {
          setNewMessage(null)      
        }, 5000)
        })
  }}

  const deletePerson = (id) => {
    
    if(window.confirm(`do you want to delete a person from your phonebook?`)){
      
      console.log(id)
    personService
      .deletePerson(id)
      .then(() => {
        personService
        .getAll()
        .then(initialPersons =>{
        setPersons(initialPersons)
        console.log('poisto toimi')
        setNewMessage('poisto onnistui')
        setTimeout(() => {
          setNewMessage(null)      
        }, 5000)
      })
  })
}
}

  const modifyPerson = personObject => {
    personService
    .modify(personObject)
    .then(() => {
      personService
      .getAll()
      .then(initialPersons =>{
      setPersons(initialPersons)
      console.log('muutos onnistui')
      setNewMessage('muutos onnistui')
      setTimeout(() => {
        setNewMessage(null)      
      }, 5000)
      }

  
      )}
    )}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


 
  return (
    <div>
      <h2>Phonebook</h2>

      <Message text={message}/>
      <form onSubmit={addPerson}>
        <div >

          name: <input value={newName}
            onChange={handleNameChange}/>
          number: <input value={newNumber}
            onChange={handleNumberChange}/>

             <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <ul>
      {persons.map(person =>
      
      <li key={person.id}>{person.name}  {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>  </li>   
      
      )} 
      </ul>
      

    </div>
  )

}

const Message = ({text}) => {
  if (text === null) {
    return null
  } else {


  return (
    <div className='message' >
      <p>{text}</p>
    </div>
  )

  }
}

export default App