import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import platformServices from '../services/platforms'
export default function SensorRecord() {
  const { id } = useParams()
  const [records, setRecords] = useState([{}])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
  platformServices.setToken(token)
  useEffect(() => {
    async function fetchData() {
      const response = await platformServices.getSensorRecord({ id, pageNumber, pageSize })
      const { data, pageNumber: pagenumber, pageSize: pagesize, totalPages: totalpages, totalRecords: totalrecords } = response
      setPageNumber(pagenumber)
      setPageSize(pagesize)
      setTotalPages(totalpages)
      setRecords(data)
      setTotalRecords(totalrecords)

      records.map(record => { console.log(record) })
    }
    fetchData()
  }, [pageNumber, pageSize])

  const handleNext = () => {
    if (pageNumber === totalPages) return
    setPageNumber(pageNumber => pageNumber + 1)
  }
  const handlePrev = () => {
    if (pageNumber === 1) return
    setPageNumber(pageNumber => pageNumber - 1)
  }

  const handleSize = (event) => {
    setPageNumber(1)
    setPageSize(event.target.value)
  }
  return (
    <div>
      <h1>Reporte Sensor</h1>
      <header className='header'>

        <p>Id del sensor: {id}</p>
        <select onChange={handleSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        
      </header>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            records?.map((record, i) => {
              return (
                <tr key={i}>
                  <td>{new Date(record.ts).toLocaleString()}</td>
                  <td>{record.value}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div className='buttons'>
        <button onClick={handlePrev}>Prev Page</button>
        <p>Pagina {pageNumber} de {totalPages} Mostrando {pageSize} Elementos</p>
        <button onClick={handleNext}>Next Page</button>
      </div>
    </div>
  )
}