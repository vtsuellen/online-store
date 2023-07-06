import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Carrinho from './pages/Carrinho';

function App() {
  return (
    <Routes>
      {/* Renderização do requesito 2 */}
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Carrinho /> } />
    </Routes>
  );
}

export default App;
