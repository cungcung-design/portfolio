import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import PreLoader from './components/PreLoader.jsx'
import FumaraSmoke from './components/FumaraSmoke/FumaraSmoke.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const Footer = lazy(() => import('./components/Footer.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreLoader/>
    <FumaraSmoke />
    <div className="relative z-10 container mx-auto px-6">
      <Navbar />
      <App />
      <Suspense fallback={null}>
        <Footer/>
      </Suspense>
    </div>
  </StrictMode>,
)
