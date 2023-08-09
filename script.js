const productContainer = document.getElementById('productContainer');

fetch('products.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'application/xml');
        const products = xmlDoc.querySelectorAll('product');

        products.forEach(productNode => {
            const product = {
                name: productNode.querySelector('name').textContent,
                image: productNode.querySelector('image').textContent,
                description: productNode.querySelector('description').textContent,
                price: productNode.querySelector('price').textContent
            };

            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="price">${product.price}</span>
                <button class="add-to-cart">Add to Cart</button>
            `;

            const addToCartButton = productElement.querySelector('.add-to-cart');
            addToCartButton.addEventListener('click', () => {
                alert(`Added ${product.name} to cart!`);
                // Implement cart functionality here
            });

            productContainer.appendChild(productElement);
        });
    });
