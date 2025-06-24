
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
<BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthContextProvider>
  
)
