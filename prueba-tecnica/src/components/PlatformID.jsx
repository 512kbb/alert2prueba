import { useEffect, useState } from 'react';
import platformServices from '../services/platforms';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function platformID() {
  const [platform, setPlatform] = useState({})
  const [lastReportContent, setLastReportContent] = useState('')
  const [showLastReport, setShowLastReport] = useState(false)
  const { token } = JSON.parse(window.localStorage.getItem('loggedUser'))
  const { id } = useParams()
  const { sensors, lastReport } = platform
  platformServices.setToken(token)
  useEffect(() => {
    async function fetchData() {
      const response = await platformServices.getPlatformById(id)
      const { data } = response
      const { lastReport } = data
      const lastReportResponse = await fetch(lastReport)
      const lastReportHTML = await lastReportResponse.text()
      setPlatform(data)
      setLastReportContent(lastReportHTML)
      console.log(data)
    }
    fetchData()
  }, [])


  return (
    <div className='platformPage'>
      <section className='platformCard'>
        <h1>{platform.name}</h1>
        <img src={platform.img} alt={platform.name} loading='lazy' />
        <p>{platform.fleet}</p>
        <button onClick={() => setShowLastReport(!showLastReport)}>Ver último reporte</button>
      </section>
      {showLastReport &&
        <section className='lastReport'>

          <div dangerouslySetInnerHTML={{ __html: lastReportContent }} />

        </section>
      }
      <section className='sensors'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              sensors?.map(sensor => {
                return (
                  <tr key={sensor.id}>
                    <td>{sensor.name}</td>
                    <td>{sensor.type}</td>
                    <td><Link to={`/plataformas/${sensor.id}/sensores`}>Reporte Sensor</Link></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default platformID