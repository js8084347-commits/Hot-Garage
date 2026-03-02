function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalElement.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>R$ ${item.price.toFixed(2)}</p>

          <div class="quantity-controls">
            <button onclick="decreaseQuantity(${index})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${index})">+</button>
          </div>

          <button class="remove-btn" onclick="removeItem(${index})">
            Remover
          </button>
        </div>
      </div>
    `;
  });

  totalElement.textContent = total.toFixed(2);
}

function increaseQuantity(index) {
  const cart = getCart();
  cart[index].quantity += 1;
  saveCart(cart);
  renderCart();
}

function decreaseQuantity(index) {
  const cart = getCart();

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);