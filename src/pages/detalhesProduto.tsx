import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

type ProductsProps = {
  title: string,
  price: number,
  thumbnail: string,
};

function DetalhesProduto() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>({});

  const ProductById = async () => {
    const dataProduct = await api.getProductById(id);
    console.log(dataProduct);
    setProduct(dataProduct);
  };

  useEffect(() => {
    ProductById();
  }, []);

  return (
    product ? (
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
      </div>
    ) : (
      <p>Carregando...</p>
    )
  );
}

export default DetalhesProduto;
