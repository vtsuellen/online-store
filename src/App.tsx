import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Carrinho from './pages/Carrinho';
import DetalhesProduto from './pages/detalhesProduto';

function App() {
  return (
    <Routes>
      {/* Renderização do requesito 2 */}
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Carrinho /> } />
      <Route path="/:id" element={ <DetalhesProduto /> } />
    </Routes>
  );
}

export default App;
