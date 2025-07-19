import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


import SellerContext from './context/SellerContext.jsx'
import UserContext from './context/UserContext.jsx'
import DiamondContext from './context/DiamondContext.jsx'
import CartContext from './context/CartContext.jsx'
import WishlistContext from './context/WhishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistContext>
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
    </WishlistContext>
  </StrictMode>
)
