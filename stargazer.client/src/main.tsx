import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './Home.tsx';
import ErrorPage from './ErrorPage.tsx'
import { BrowserRouter, createBrowserRouter, RouterProvider, Link, Routes, Route} from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <p>top level</p>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
    </BrowserRouter>
  </StrictMode>,
)
