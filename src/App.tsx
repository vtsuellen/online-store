import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Carrinho from './pages/Carrinho';
import DetalhesProduto from './pages/detalhesProduto';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Routes>
      {/* Renderização do requesito 2 */}
      <Route path="/" element={ <Home /> } />
      <Route path="/carrinho" element={ <Carrinho /> } />
      <Route path="/:id" element={ <DetalhesProduto /> } />
      <Route path="/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default App;
