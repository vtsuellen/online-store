import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

  const getCategories = async () => {
    const categorie = await api.getCategories();
    setCategories(categorie);
  };

  // vai chamar a funcão da API e realizar uma vez
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div>
        {/* Campo de busca */}
        <input type="text" placeholder="Buscar" />

        {/* Botão do carrinho de compras */}
        <Link to="/carrinho" data-testid="shopping-cart-button">
          {/* img não esta rendezirando */}
          <img src="./src/img/carrinho.png" alt="Carrinho de Compras" />
        </Link>

      </div>

      {/* Quando a lista estiver vazia, a página deverá mostrar a mensagem "Digite algum termo de pesquisa ou escolha uma categoria." */}
      <div>
        {products.length === 0 ? (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        ) : (
          <p>Aqui vai a listagem de produtos</p>
        )}
      </div>

      <aside>
        {categories.length > 0 && categories
          .map((categorie) => (
            <button
              data-testid="category"
              key={ categorie.id }
            >
              {categorie.name}
            </button>
          ))}
      </aside>
    </>
  );
}

export default Home;
