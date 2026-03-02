fetch("/data/novidades.json")
    .then(res => res.json())
    .then(data => {

        const grid = document.getElementById("novidades-grid");

        function renderProducts(filter = "all") {
            grid.innerHTML = "";

            const filtered = filter === "all"
                ? data
                : data.filter(item => item.category.includes(filter));

            filtered.forEach(product => {
                grid.innerHTML += `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-info">
              <h3>${product.name}</h3>
              <p class="price">R$ ${product.price}</p>
            </div>
            <button class="add-to-cart-btn" data-product='${JSON.stringify(product)}'>Adicionar ao carrinho</button>
          </div>
        `;
            });

            // Adiciona event listeners aos botões após renderizar
            document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const product = JSON.parse(btn.dataset.product);
                    addToCart(product);
                });
            });
        }

        renderProducts();

        document.querySelectorAll(".filters button").forEach(btn => {
            btn.addEventListener("click", () => {
                renderProducts(btn.dataset.filter);
            });
        });

    });