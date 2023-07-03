import { useEffect, useState } from 'react'
import loginService from './services/login.js'
import Notification from './components/Notification.jsx'
import Platforms from './components/Platforms.jsx'
import platformService from './services/platforms.js'
import './App.css'
import LoginForm from './components/LoginForm.jsx'

function Dashboard() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      platformService.setToken(user.token)
      setUser(user)
    }
    
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ 
        email: username, 
        password: password 
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      
      platformService.setToken(user.token)
      console.log(user)
    } catch (e) {
      setErrorMessage('Email o contraseña incorrectos')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  

  return (
    <div className='main'>
      { 
        user 
        ? <Platforms className='dashboard' /> 
        : <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={(event) => setUsername(event.target.value)}
            handlePasswordChange={(event) => setPassword(event.target.value)}
            handleSubmit={handleLogin}
          /> 
      }
      <Notification message={errorMessage} />
    </div>
  )
}

export default Dashboard
