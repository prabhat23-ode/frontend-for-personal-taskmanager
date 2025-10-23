import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import './index.css'
import App from './App.jsx'
import { setAuthToken } from './Constant.js'

// on startup, if token exists in localStorage, set default header
const token = localStorage.getItem('taskAppToken');
if (token) setAuthToken(token);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
