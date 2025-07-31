
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx'
import { CartContextProvider } from './context/CartContext.jsx'
createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SearchContextProvider >
    <CartContextProvider>
        <BrowserRouter>
    <App />
  </BrowserRouter>
    </CartContextProvider>
    </SearchContextProvider>
  </AuthContextProvider>
  
)
