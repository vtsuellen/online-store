import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/productCard';
import Styles from './home.module.css';

// Tipagem do objeto da lista de produtos, utilizando so as propriedades necessarias até agora
type ProductsProps = {
  title: string,
  price: number,
  thumbnail: string,
};

const HOME_MSG = 'Digite algum termo de pesquisa ou escolha uma categoria.';

function Home() {
  const [homeMessage, setHomeMessage] = useState(HOME_MSG);
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [searchValue, setSearchValue] = useState('');
  // não foi necessario utilizar categoria ainda, mas como a função da api solicita, ja implementei
  const [selectedCategory, setSelectedCategory] = useState('');

  const getCategories = async () => {
    const category = await api.getCategories();
    setCategories(category);
  };

  // vai chamar a funcão da API e realizar uma vez
  useEffect(() => {
    getCategories();
  }, []);

  // função responsável por chamar a api ao clicar no botão buscar utilizando a info digitada no campo search
  const searchHandleClick = async () => {
    // adicionei essa verificação porq o useEffect da linha 47 tava retornando 3x no lugar de 2 pra cumprir o requisito.
    if (selectedCategory) {
      const dt = await api.getProductsFromCategoryAndQuery(selectedCategory, searchValue);
      setProducts(dt.results);
      if (dt.results.length === 0) setHomeMessage('Nenhum produto foi encontrado');
      setSearchValue('');
    }
  };
  const handleCategoriesClick = async (categoriesId: string) => {
    setSelectedCategory(categoriesId);
  };
  useEffect(() => {
    searchHandleClick();
  }, [selectedCategory]);

  return (
    <>
      <div>
        {/* Campo de busca */}
        <input
          type="text"
          placeholder="Buscar"
          data-testid="query-input"
          value={ searchValue }
          onChange={ ({ target }) => setSearchValue(target.value) }
        />

        {/* Botão responsável por acionar a função que chama a api de busca */}
        <button
          data-testid="query-button"
          onClick={ () => searchHandleClick() }
        >
          buscar
        </button>

        {/* Botão do carrinho de compras */}
        <Link to="/carrinho" data-testid="shopping-cart-button">
          {/* img não esta rendezirando */}
          <img src="./src/img/carrinho.png" alt="Carrinho de Compras" />
        </Link>

      </div>

      {/* Quando a lista estiver vazia, a página deverá mostrar a mensagem "Digite algum termo de pesquisa ou escolha uma categoria." */}
      {/* Quando for feita uma busca sem resultado ira retornar a mensagem "nenhum produto encontrado" atraves do useState homeMessage */}
      {/* Quando houver uma busca bem sucedida retornara um .map do componente productCard listando os produtos */}
      <div className={ Styles.container }>
        {products.length === 0 ? (
          <h1 data-testid="home-initial-message">
            {homeMessage}
          </h1>
        ) : (
          products.map((element, index) => (<ProductCard
            key={ index }
            name={ element.title }
            img={ element.thumbnail }
            price={ element.price }
          />))
        )}
      </div>

      <aside>
        {categories.length > 0 && categories
          .map((category) => (
            <button
              data-testid="category"
              key={ category.id }
              onClick={ () => handleCategoriesClick(category.id) }
            >
              {category.name}
            </button>
          ))}
      </aside>
    </>
  );
}

export default Home;
