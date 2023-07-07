import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { ProductsProps } from './home';

function DetalhesProduto() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>({});
  const [listCart, setListCart] = useState<ProductsProps[]>([]);
  const [itensCart, setItemsCart] = useState<ProductsProps[]>([]);

  const productById = async () => {
    const dataProduct = await api.getProductById(id);
    setProduct(dataProduct);
  };

  useEffect(() => {
    productById();
  }, []);

  const addCart = () => {
    const resultado = localStorage.getItem('dataCart');
    if (resultado) {
      const getItensCart = JSON.parse(resultado);
      setItemsCart(getItensCart);
    }
  };

  useEffect(() => {
    addCart();
  }, []);

  /* função que adiciona ao localStorage */
  const handleAddCart = async (element: ProductsProps) => {
    const newObject = {
      title: element.title,
      thumbnail: element.thumbnail,
      price: element.price,
      id: element.id,
    };
    /* mescla itens do carrinho com o novo */
    const listCartLocalStorage = [...listCart, newObject];
    setListCart((anterior) => [...anterior, newObject]);
    localStorage.setItem('dataCart', JSON.stringify(listCartLocalStorage));
  };

  return (
    <div>
      <h1>Detalhes do produto</h1>
      <p data-testid="product-detail-name">
        Nome:
        { product.title }
      </p>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt=""
      />
      <p data-testid="product-detail-price">
        Price:
        {product.price}
      </p>
      <Link to="/carrinho" data-testid="shopping-cart-button">
        <img src="./src/img/carrinho.png" alt="Carrinho de Compras" />
      </Link>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddCart(product) }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default DetalhesProduto;
