import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google";
import "flowbite/dist/flowbite.css";
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <GoogleOAuthProvider clientId="606228303878-c09co1btueii8iti8h1mfp8chtu168ne.apps.googleusercontent.com">
   <AuthProvider>
       <App />
   </AuthProvider>
   
    </GoogleOAuthProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
