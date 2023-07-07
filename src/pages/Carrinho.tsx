import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsProps } from './home';

function Carrinho() {
  const [itensCart, setItemsCart] = useState<ProductsProps[]>([]);
  const carrinhoVazio = true; // Defina essa variável com base no estado do carrinho
  /* pega lista de carts do localStorage */
  const addCart = () => {
    const resultado = localStorage.getItem('dataCart');
    if (resultado) {
      const getItensCart = JSON.parse(resultado);
      setItemsCart(getItensCart);
      console.log(getItensCart);
    }
  };

  useEffect(() => {
    addCart();
  }, []);

  return (
    <div>
      {carrinhoVazio && itensCart.length === 0 ? (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      ) : (
        <div>
          {
            itensCart.map((element) => (
              <div key={ element.id }>
                <span data-testid="shopping-cart-product-name">{element.title}</span>
                <img src={ element.thumbnail } alt={ `${element.title} thumbnail` } />
                <span>
                  {`R$ ${element.price}`}

                </span>
                <span data-testid="shopping-cart-product-quantity">1</span>
              </div>
            ))
          }
        </div>
      )}

      {/* Botão para voltar à página inicial */}
      <Link to="/">Voltar à página inicial</Link>
    </div>
  );
}

export default Carrinho;
