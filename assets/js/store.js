import { supabase } from '../../supabase.js';

let products = [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
}

export async function loadProducts(target = '#products') {
  const area = document.querySelector(target);
  if (!area) return;

  const { data, error } = await supabase.from('products').select('*');
  if (error) return console.error(error);

  products = data || [];

  area.innerHTML = products.map(product => `
    <article class="product fade" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image">
        ${product.sale ? '<span class="product-badge sale">Sale</span>' : ''}
        ${product.new ? '<span class="product-badge">New</span>' : ''}
        <img src="${product.image_url || ''}" alt="${product.name}">
      </div>

      <div class="product-info">
        <span class="brand-badge">${product.brand || 'Sportswear'}</span>
        <h3>${product.name}</h3>
        <p class="category">${product.category || 'Performance wear'}</p>
        <strong class="price">${product.price} SEK</strong>
        <button class="quick-add" onclick="event.stopPropagation(); window.addToCart('${product.id}')">
          Add to cart
        </button>
      </div>
    </article>
  `).join('');
}

window.addToCart = function(id) {
  const product = products.find(p => String(p.id) === String(id));
  if (!product) return;

  const existing = cart.find(p => String(p.id) === String(id));
  if (existing) existing.quantity = (existing.quantity || 1) + 1;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  showCartToast();
};

window.removeFromCart = function(id) {
  cart = cart.filter(item => String(item.id) !== String(id));
  saveCart();
  location.reload();
};

window.updateQuantity = function(id, quantity) {
  const item = cart.find(p => String(p.id) === String(id));
  if (item) item.quantity = Math.max(1, Number(quantity));
  saveCart();
  location.reload();
};

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function showCartToast() {
  const existingToast = document.querySelector('.cart-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.textContent = 'Added to cart';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

window.addEventListener('load', updateCartBadge);
window.storeCart = cart;
