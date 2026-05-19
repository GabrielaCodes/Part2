import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}
export default { getAll, create, remove, update }
export default Persons
export default { getAll, create, remove }