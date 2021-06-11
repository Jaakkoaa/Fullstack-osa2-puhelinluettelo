import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deletePerson = id =>  {
  console.log(`${baseUrl}/${id}`)
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log(request.then(response => response.data))
  return request.then(response => response.data)
}

const modify = newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

export default {getAll, create, deletePerson, modify}