import React from 'react'
import { CartProvider } from './context/CartContext'
import { MenuProvider } from './context/MenuContext'
import { ThemeProvider } from './context/ThemeContext'
import AppContent from './AppContent'

function App() {
  return (
    <ThemeProvider>
      <MenuProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </MenuProvider>
    </ThemeProvider>
  )
}

export default App
