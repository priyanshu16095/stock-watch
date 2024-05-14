import { Button, Container, Input, Typography } from '@mui/material'
import React from 'react'
import { SymbolState } from '../SymbolContext'

function Login() {
  const { user, setUser, setIsLogin } = SymbolState()

  function handleChange(e) {
    setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
  }
  function handleSubmit() {
    setIsLogin(true)
  }

  return (
    <div className='center-both'>
      <Container>
        <div className="login flex-v2">
          <Typography variant='h6'>Login</Typography>
          <div className="flex-vh">
            <Typography></Typography>
            <Input name='email' value={user.email} variant="outlined" placeholder='Email' onChange={handleChange} />
            <Input name='password' value={user.password} variant="outlined" placeholder='Password' onChange={handleChange} />
          </div>
          <Button variant='contained' onClick={handleSubmit}>Login</Button>
        </div>
      </Container>
    </div>

  )
}

export default Login
