import React from 'react'
import { Link } from 'react-router-dom'
const Platform = ({ id, name, img, fleet }) => { 
  return (
    <li className='platform'>
      <h4>{name}</h4>
      <img src={img} alt={name} loading='lazy'/>
      <p>{fleet}</p>
      <Link to={`/plataformas/${id}`}><button>Detalle</button></Link>
    </li>
  )
}

export default Platform