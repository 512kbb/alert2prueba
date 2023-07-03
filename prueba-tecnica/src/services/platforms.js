const baseUrl = 'https://devtest.a2g.io/api'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getPlatforms = ({ pageNumber, pageSize, fleet }) => {
  const response = fetch(`${baseUrl}/Platforms?pageNumber=${pageNumber}&pageSize=${pageSize}&fleet=${fleet}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        throw new Error('Error en la petición')
      }
    })
    .catch(error => { console.log(error) })
  console.log(response)
  return response
}

const getPlatformById = (id) => {
  const response = fetch(`${baseUrl}/Platforms/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        throw new Error('Error en la petición')
      }
    })
    .catch(error => { console.log(error) })
  console.log(response)
  return response
}

const getSensorRecord = ({ id, pageNumber, pageSize }) => {
  console.log(token, id)
  const response = fetch(`${baseUrl}/Records/${id}?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
  })
    .then(response => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        throw new Error('Error en la petición')
      }
    })
    .catch(error => { console.log(error) })
  console.log(response)
  return response
}

export default { getPlatforms, getPlatformById, getSensorRecord, setToken }