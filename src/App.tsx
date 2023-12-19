import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SiteHeader from './components/SiteHeader/SiteHeader';
import Details from './components/Details/Details';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';
import {Container} from '@mui/material'



function App() {
  return (
    <Router>
      <div className="MainPage">
        <div className="SiteHeader">
          <SiteHeader />
        </div>
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:shelterId" element={<Details />} />
            
          </Routes>
        </div>
        
          <Footer />
         
      </div>
    </Router>
  );
}

export default App;
