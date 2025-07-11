import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


import SellerContext from './context/SellerContext.jsx'
import UserContext from './context/UserContext.jsx'
import DiamondContext from './context/DiamondContext.jsx'
import CartContext from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartContext>
      <DiamondContext>
        <UserContext>
          <SellerContext>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SellerContext>
        </UserContext>
      </DiamondContext>
    </CartContext>
  </StrictMode>
)
