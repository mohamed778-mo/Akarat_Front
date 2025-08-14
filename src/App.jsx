
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AppRoutes from "./AppRoutes"; 

function App() {
  return (
    <Router>
\      <HelmetProvider>
        <div className="bg-slate-50 min-h-screen flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <AppRoutes />
          </main>
          
          <Footer />
          <WhatsAppButton />
        </div>
      </HelmetProvider>
    </Router>
  );
}

export default App;