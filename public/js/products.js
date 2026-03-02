document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("products-grid");
  const buttons = document.querySelectorAll(".filters button");

  let allProducts = [];

  fetch("/data/products.json")
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      renderProducts(products);
    });

  function renderProducts(products) {
    grid.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
      `;

      grid.appendChild(card);
    });
  }

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      const filter = button.dataset.filter;

      if (filter === "all") {
        renderProducts(allProducts);
      } else {
        const filtered = allProducts.filter(p => p.brand === filter);
        renderProducts(filtered);
      }

    });
  });

});