import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SellerContext from './context/SellerContext.jsx'
import UserContext from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <SellerContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SellerContext>
    </UserContext>
  </StrictMode>,
)
