export async function getCategories() {
  // Implemente aqui
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await result.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = result.json();
  return data;
}

export async function getProductById(id: string) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const dataProduct = await result.json();
  console.log(dataProduct);
  return dataProduct;
}

export default {
  getCategories,
  getProductsFromCategoryAndQuery,
  getProductById,
};
