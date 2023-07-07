import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProductsProps } from './home';

function Carrinho() {
  const [itensCart, setItemsCart] = useState<ProductsProps[]>([]);

  const carrinhoVazio = true; // Defina essa variável com base no estado do carrinho

  /* pega lista de carts do localStorage */
  const addCart = () => {
    const result = localStorage.getItem('dataCart');
    if (result) {
      const getItensCart = JSON.parse(result);
      setItemsCart(getItensCart);
    }
  };

  useEffect(() => {
    addCart();
  }, []);

  const removeItemHandleClick = (id: string) => {
    const result = localStorage.getItem('dataCart');
    if (result) {
      const getItensCart = JSON.parse(result);
      const filteredCart = getItensCart.filter((item: ProductsProps) => item.id !== id);
      localStorage.setItem('dataCart', JSON.stringify(filteredCart));
      setItemsCart(filteredCart);
    }
  };

  const decreaseHandleClick = (cartItem: ProductsProps) => {
    if (cartItem.qty >= 2) {
      const newQty = cartItem.qty - 1;
      const cartList = itensCart;
      let index = 0;
      for (let i = 0; i < cartList.length; i += 1) {
        if (cartList[i].id === cartItem.id) {
          index = i;
        }
      }
      cartList[index].qty = newQty;
      localStorage.setItem('dataCart', JSON.stringify(cartList));
      setItemsCart([...cartList]);
    }
  };

  const increaseHandleClick = (cartItem: ProductsProps) => {
    const newQty = cartItem.qty + 1;
    const cartList = itensCart;
    let index = 0;
    for (let i = 0; i < cartList.length; i += 1) {
      if (cartList[i].id === cartItem.id) {
        index = i;
      }
    }
    cartList[index].qty = newQty;
    localStorage.setItem('dataCart', JSON.stringify(cartList));
    setItemsCart([...cartList]);
  };

  return (
    <div>
      {carrinhoVazio && itensCart.length === 0 ? (
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
      ) : (
        <div>
          {
            itensCart.map((element) => (
              <div key={ element.id }>
                <button
                  onClick={ () => removeItemHandleClick(element.id) }
                  data-testid="remove-product"
                >
                  x
                </button>
                <span data-testid="shopping-cart-product-name">{element.title}</span>
                <img src={ element.thumbnail } alt={ `${element.title} thumbnail` } />
                <span>
                  {`R$ ${element.price}   `}

                </span>
                <button
                  onClick={ () => decreaseHandleClick(element) }
                  data-testid="product-decrease-quantity"
                >
                  -
                </button>
                <span data-testid="shopping-cart-product-quantity">{element.qty}</span>
                <button
                  onClick={ () => increaseHandleClick(element) }
                  data-testid="product-increase-quantity"
                >
                  +
                </button>
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
