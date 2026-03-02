// ============================================================
//  addToCart.js — Lógica central de adicionar ao carrinho
// ============================================================

/**
 * Adiciona um produto ao carrinho (localStorage).
 * Se já existir, incrementa a quantidade.
 * Depois, atualiza o badge da navbar e mostra um toast.
 */
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showToast(`"${product.name}" adicionado ao carrinho! 🛒`);
}

/**
 * Atualiza o contador visível na navbar.
 */
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
}

/**
 * Mostra uma notificação temporária (toast) no canto da tela.
 */
function showToast(message) {
    // Remove toast anterior se ainda estiver visível
    const existing = document.getElementById('cart-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'cart-toast';
    toast.textContent = message;
    toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #d32f2f;
    color: white;
    padding: 14px 22px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 15px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    z-index: 9999;
    animation: slideInToast 0.3s ease;
    max-width: 320px;
  `;

    // Injeta keyframes se ainda não existirem
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
      @keyframes slideInToast {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Remove automaticamente após 2.5 segundos
    setTimeout(() => {
        toast.style.transition = 'opacity 0.3s ease';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Atualiza o badge assim que o script carrega
document.addEventListener('DOMContentLoaded', updateCartBadge);
