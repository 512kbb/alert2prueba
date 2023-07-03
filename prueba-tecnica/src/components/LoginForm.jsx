import React from 'react'

export default function LoginForm (props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input 
        name='username' 
        type='text' 
        value={props.username}
        onChange={props.handleUsernameChange}
        placeholder='Nombre de usuario'
        />
      <input 
        name='password' 
        type='password'
        value={props.password}
        onChange={props.handlePasswordChange}
        placeholder='Contraseña'
        />
      <button>Login</button>
    </form>
  )
}