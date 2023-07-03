import React from 'react'
import Platform from './Platform.jsx'
import platformService from '../services/platforms.js'
import { useState, useEffect } from 'react'
function Platforms() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(30)
  const [fleet, setFleet] = useState('ALL')

  const [platforms, setPlatforms] = useState([])
  const hasPlatforms = Object.keys(platforms).length > 0
  
  
  useEffect(() => {
    async function fetchData() {
      const response = await platformService.getPlatforms({ pageNumber, pageSize, fleet })
      const { data, pageNumber: pagenumber, pageSize: pagesize, totalPages: totalpages } = response
      setPlatforms(data)
      setPageNumber(pagenumber)
      setPageSize(pagesize)
      setTotalPages(totalpages)
      console.log(pageNumber, pageSize, totalPages)
    }
    fetchData()
  }, [pageNumber, pageSize, fleet, totalPages])

  const handleNext = () => {
    if (pageNumber === totalPages) return
    setPageNumber(pageNumber => pageNumber + 1)
  }
  const handlePrev = () => {
    if (pageNumber === 1) return
    setPageNumber(pageNumber => pageNumber - 1)
  }

  const handleSize = (event) => {
    console.log(pageNumber > totalPages)
    setPageNumber(1)
    setPageSize(event.target.value)
    console.log(pageNumber, pageSize, totalPages)
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  return (
    <div className='page'>
      <h1>Plataformas</h1>
      <button onClick={handleLogOut}>LogOut</button>
      <header className='header'>
        <p>Resultados</p>
        <select onChange={handleSize}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        <button onClick={handlePrev}>Prev Page</button>
        <p>Pagina {pageNumber} de {totalPages} Mostrando {pageSize} Elementos</p>
        <button onClick={handleNext}>Next Page</button>
        
      </header>

      <main className='main'>
        <ul className='platforms'>
          {
            hasPlatforms
              ? (
                platforms.map(platform => (
                  <Platform
                    key={platform.id}
                    id={platform.id}
                    name={platform.name}
                    img={platform.img}
                    fleet={platform.fleet}
                  />
                ))
              ) :
              (
                <p>No hay plataformas</p>
              )
          }

        </ul>
        
      </main>
    </div>
  )
}

export default Platforms