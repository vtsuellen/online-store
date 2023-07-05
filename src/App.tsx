import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Carrinho from './pages/Carrinho';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Routes>
        {/* Renderização do requesito 2 */}
        <Route path="/" element={ <Home /> } />
        <Route path="/carrinho" element={ <Carrinho /> } />
      </Routes>
    </div>
  );
}

export default App;
