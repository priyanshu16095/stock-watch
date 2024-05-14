import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SymbolContext from './SymbolContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SymbolContext>
      <App />
    </SymbolContext>
  </React.StrictMode>,
)
