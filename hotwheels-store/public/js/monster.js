fetch("/data/monster.json")
  .then(res => res.json())
  .then(data => {

    const grid = document.getElementById("monster-grid");
    const filterBtns = document.querySelectorAll(".filters button");

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
              <p class="price">R$ ${Number(product.price).toFixed(2)}</p>
            </div>
            <button onclick='addToCart(${JSON.stringify(product)})'>Adicionar ao Carrinho</button>
          </div>
        `;
      });
    }

    renderProducts();

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderProducts(btn.dataset.filter);
      });
    });

  });