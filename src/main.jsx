import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import PreLoader from './components/PreLoader.jsx'
import FumaraSmoke from './components/FumaraSmoke/FumaraSmoke.jsx'

const Footer = lazy(() => import('./components/Footer.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreLoader/>
    <FumaraSmoke />
    <div className="relative z-10 w-full min-w-0 overflow-x-clip">
      <Navbar />
      <App />
      <Suspense fallback={null}>
        <Footer/>
      </Suspense>
    </div>
  </StrictMode>,
)
