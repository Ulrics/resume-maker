import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ResumeInputs } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResumeInputs />
  </StrictMode>,
)
