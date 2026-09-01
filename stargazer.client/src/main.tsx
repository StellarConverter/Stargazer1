import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LandingPage from './LandingPage.tsx'
import MainPage from './MainPage.tsx';
import Peek from './Peek.tsx';
import ErrorPage from './ErrorPage.tsx'
import { BrowserRouter, createBrowserRouter, RouterProvider, Link, Routes, Route } from 'react-router-dom';
import './assets/site.css';

function goHome() :  void
{
    window.location.href = '/';
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <div className="full-width moron">
                <span className="stargazer-caption left-align" onClick={goHome}>
                    Stargazer
                </span>
                <span className="right-align">
                    React | SemanticKernel | Ollama | C# | Typescript
                </span>
            </div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/old" element={<App />} />
                <Route path="/peek" element={<Peek />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
    </BrowserRouter>
  </StrictMode>,
)
