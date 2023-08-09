const products = [
  { name: 'product one', description: 'Description for product one' },
  { name: 'product two', description: 'Description for product two' },
  { name: 'product 3', description: 'Description for product 3' },
  { name: 'product 4', description: 'Description for product 4' },
  { name: 'product 5', description: 'Description for product 5' }
];

const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');

function displayProducts(searchQuery) {
  productList.innerHTML = '';

  const filteredProducts = products.filter(product => {
    const productName = product.name.toLowerCase();
    return productName.includes(searchQuery.toLowerCase());
  });

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `<h2>${product.name}</h2><p>${product.description}</p>`;
    productList.appendChild(productDiv);
  });
}

searchInput.addEventListener('input', event => {
  const searchQuery = event.target.value;
  displayProducts(searchQuery);
});

// Initial display of all products
displayProducts('');
