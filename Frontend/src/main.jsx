import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './context/userContext.jsx'
import SellerContextProvider from './context/SellerContext.jsx'
import DiamondContextProvider from './context/DiamondContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SellerContextProvider>
      <DiamondContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
      </DiamondContextProvider>
    </SellerContextProvider>
  </StrictMode>,
)
