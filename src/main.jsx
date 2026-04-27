import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import 'aos/dist/aos.css';
import 'animate.css';
import { loadConfig } from './configLoader.js';
import Loader from './Component/Loader/index.jsx';
import { HelmetProvider } from 'react-helmet-async';

const App = React.lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(<Loader />);

loadConfig().then(() => {
  createRoot(document.getElementById('root')).render(
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>

  );
});
