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
                price: productNode.querySelector('price').textContent,
                link: productNode.querySelector('link').textContent
            };

            const productElement = document.createElement('div');
            productElement.classList.add('product');

            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="price">${product.price}</span>
                <button class="view-product">View Product</button>
            `;

            const viewProductButton = productElement.querySelector('.view-product');
            viewProductButton.addEventListener('click', () => {
                window.location.href = product.link;
            });

            productContainer.appendChild(productElement);
        });
    });
