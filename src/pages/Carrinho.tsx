import { Link } from 'react-router-dom';

function Carrinho() {
  const carrinhoVazio = true; // Defina essa variável com base no estado do carrinho

  return (
    <div>
      {carrinhoVazio ? (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      ) : (
        <div>
          {/* Exibir conteúdo do carrinho */}
        </div>
      )}

      {/* Botão para voltar à página inicial */}
      <Link to="/">Voltar à página inicial</Link>
    </div>
  );
}

export default Carrinho;
