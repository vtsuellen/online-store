import { useState } from 'react';

function Home() {
  const [list, setList] = useState([]);
  return (
    <>
      {/* Campo de busca */}
      <input type="text" placeholder="Buscar" />

      {/* Quando a lista estiver vazia, a página deverá mostrar a mensagem "Digite algum termo de pesquisa ou escolha uma categoria." */}
      <div>
        { list.length === 0
          ? (
            <h1 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h1>) : <p>Aqui vai a listagem de produtos</p>}
      </div>
    </>
  );
}

export default Home;
