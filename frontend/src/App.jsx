import React from 'react'
import Home from './Pages/Home'
import Login from './Components/Login'
import { SymbolState } from './SymbolContext'

function App() {
  const{ isLogin } = SymbolState()

  return (
      <div>
        {!isLogin && <Login />}
        {isLogin && <Home />}
      </div>
  )
}

export default App
