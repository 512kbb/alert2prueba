import Dashboard from './Dashboard'

import './App.css'
import { useState } from 'react'
import PlatformID from './components/PlatformID'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import SensorRecord from './components/SensorRecord'

const sites = [
  {
    id: 2,
    name: 'Plataformas',
    route: '/plataformas',
  }
]

function App() {
  const [page, setPage] = useState('home')


  return (
      <main>
        <Routes>
          <Route path='/plataformas' element={ <Dashboard /> }/>
          <Route path='/plataformas/:id' element={ <PlatformID /> }/>
          <Route path='/plataformas/:id/sensores' element={ <SensorRecord /> }/>
        </Routes>
      </main>
  )
}

export default App
