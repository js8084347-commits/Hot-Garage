fetch("/data/monster.json")
  .then(res => res.json())
  .then(data => {

    const grid = document.getElementById("monster-grid");

    function renderProducts(filter = "all") {
      grid.innerHTML = "";

      const filtered = filter === "all"
        ? data
        : data.filter(item => item.category === filter);

      filtered.forEach(product => {
        grid.innerHTML += `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="card-info">
              <h3>${product.name}</h3>
              <p class="price">R$ ${product.price}</p>
            </div>
            <button>Adicionar ao carrinho</button>
          </div>
        `;
      });
    }

    renderProducts();

    document.querySelectorAll(".filters button").forEach(btn => {
      btn.addEventListener("click", () => {
        renderProducts(btn.dataset.filter);
      });
    });

  });