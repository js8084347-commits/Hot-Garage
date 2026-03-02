// Funções globais de carrinho reutilizadas por todas as páginas de produtos
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    showToast(`"${product.name}" adicionado ao carrinho!`);
}

function showToast(message) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cart-toast';
        toast.style.cssText = `
      position: fixed; bottom: 30px; right: 30px;
      background: #d32f2f; color: white;
      padding: 14px 22px; border-radius: 10px;
      font-weight: bold; font-size: 14px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      z-index: 9999; opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      transform: translateY(20px);
    `;
        document.body.appendChild(toast);
    }

    toast.textContent = '🛒 ' + message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 2800);
}

// Atualiza badge ao carregar qualquer página
document.addEventListener('DOMContentLoaded', updateCartBadge);
