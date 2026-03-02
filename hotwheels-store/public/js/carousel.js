document.addEventListener("DOMContentLoaded", () => {

  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const dotsContainer = document.getElementById("carousel-dots");

  const cardsPerPage = 4;
  const cardFullWidth = 240; // card + gap
  let currentPage = 0;
  let totalPages = 0;

  fetch("/data/products.json")
    .then(res => res.json())
    .then(products => {

      products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="card-info">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button class="card-add-btn" onclick='addToCart(${JSON.stringify(product)})'>Adicionar ao Carrinho</button>
          </div>
        `;

        track.appendChild(card);
      });

      totalPages = Math.ceil(products.length / cardsPerPage);
      createDots();
      updateCarousel();

    });

  function updateCarousel() {
    const offset = currentPage * cardsPerPage * cardFullWidth;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function createDots() {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");

      dot.addEventListener("click", () => {
        currentPage = i;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll("span");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPage);
    });
  }

  // LOOP INFINITO
  nextBtn.addEventListener("click", () => {
    currentPage++;
    if (currentPage >= totalPages) {
      currentPage = 0;
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentPage--;
    if (currentPage < 0) {
      currentPage = totalPages - 1;
    }
    updateCarousel();
  });

});
