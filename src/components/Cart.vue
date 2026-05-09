<template>
  <div class="cart-container">
    <button class="cart-toggle" @click="toggleCart" :class="{ 'has-items': cartItemCount > 0 }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
      <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
    </button>
    <div v-if="isOpen" class="cart-dropdown">
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button class="close-cart" @click="toggleCart">×</button>
      </div>
      
      <div v-if="items.length === 0" class="empty-cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        <p>Your cart is empty</p>
      </div>
      
      <div v-else class="cart-items">
        <div v-for="item in items" :key="item.id" class="cart-item">
          <div class="item-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="item-details">
            <h4>{{ item.name }}</h4>
            <div class="item-controls">
              <div class="quantity-controls">
                <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
              <div class="item-price">${{ formatPrice(item.price) }}</div>
            </div>
          </div>
          <button class="remove-item" @click="removeFromCart(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div v-if="items.length > 0" class="cart-footer">
        <div class="cart-total">
          <strong>Total: ${{ cartSubtotal }}</strong>
        </div>
        <div class="cart-actions">
          <button class="btn-secondary" @click="clearCart">Clear Cart</button>
          <router-link to="/checkout" class="btn checkout-btn" @click="toggleCart">
            Checkout
          </router-link>
        </div>
      </div>
    </div>
    
    <div v-if="isOpen" class="cart-backdrop" @click="toggleCart"></div>
  </div>
</template>

<script setup>
import { useCart } from '../store/cart.js';

const cartStore = useCart();

const { 
  items, 
  isOpen, 
  cartItemCount, 
  cartSubtotal, 
  toggleCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
} = cartStore;

const formatPrice = (price) => {
  return price.replace(/\D/g, '');
};
</script>

<style scoped>
.cart-container {
  position: relative;
}

.cart-toggle {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s;
  color: var(--text);
}

.cart-toggle:hover {
  background-color: var(--background-light);
}

.cart-toggle.has-items {
  color: var(--primary-dark);
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.cart-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 400px;
  max-height: 500px;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--background-light);
}

.cart-header h3 {
  margin: 0;
  color: var(--accent);
}

.close-cart {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text);
  padding: 0.25rem;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: var(--text);
}

.empty-cart svg {
  margin-bottom: 1rem;
  color: var(--primary-light);
}

.cart-items {
  max-height: 300px;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--background-light);
  gap: 1rem;
}

.item-image {
  width: 60px;
  height: 60px;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: var(--accent);
}

.item-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-controls button {
  width: 24px;
  height: 24px;
  border: 1px solid var(--primary-light);
  background: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  font-weight: 500;
  min-width: 20px;
  text-align: center;
}

.item-price {
  font-weight: 600;
  color: var(--primary-dark);
}

.remove-item {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.remove-item:hover {
  background-color: #f8d7da;
}

.cart-footer {
  padding: 1rem;
  border-top: 1px solid var(--background-light);
}

.cart-total {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--accent);
}

.cart-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-secondary {
  flex: 1;
  padding: 0.75rem;
  background: var(--background-light);
  color: var(--text);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background: var(--primary-light);
  color: white;
}

.checkout-btn {
  flex: 2;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  text-align: center;
}

.cart-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

@media (max-width: 480px) {
  .cart-dropdown {
    width: 90vw;
    right: -45vw;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
