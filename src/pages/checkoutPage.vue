<template>
  <div class="checkout-page">
 
    <div class="page-header">
      <div class="container">
        <h1>Checkout</h1>
        <p>Complete your coffee order</p>
      </div>
    </div>

    <div class="container">
  
      <div v-if="cartItemCount === 0" class="empty-checkout">
        <div class="empty-cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Add some delicious coffee to your cart before checking out.</p>
        <router-link to="/menu" class="btn">Browse Menu</router-link>
      </div>


      <div v-else class="checkout-content">

        <div class="checkout-steps">
          <div class="step" :class="{ 'active': currentStep === 1, 'completed': currentStep > 1 }">
            <div class="step-circle">
              <span v-if="currentStep > 1">✓</span>
              <span v-else>1</span>
            </div>
            <span class="step-label">Order Review</span>
          </div>
          <div class="step-line" :class="{ 'completed': currentStep > 1 }"></div>
          <div class="step" :class="{ 'active': currentStep === 2, 'completed': currentStep > 2 }">
            <div class="step-circle">
              <span v-if="currentStep > 2">✓</span>
              <span v-else>2</span>
            </div>
            <span class="step-label">Delivery Info</span>
          </div>
          <div class="step-line" :class="{ 'completed': currentStep > 2 }"></div>
          <div class="step" :class="{ 'active': currentStep === 3, 'completed': currentStep > 3 }">
            <div class="step-circle">
              <span v-if="currentStep > 3">✓</span>
              <span v-else>3</span>
            </div>
            <span class="step-label">Payment</span>
          </div>
          <div class="step-line" :class="{ 'completed': currentStep > 3 }"></div>
          <div class="step" :class="{ 'active': currentStep === 4 }">
            <div class="step-circle">4</div>
            <span class="step-label">Confirmation</span>
          </div>
        </div>

        <div class="checkout-main">
   
          <div v-if="currentStep === 1" class="checkout-step">
            <div class="step-content">
              <h2>Review Your Order</h2>
              <div class="order-items">
                <div v-for="item in items" :key="item.id" class="order-item">
                  <div class="item-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
                  <div class="item-details">
                    <h3>{{ item.name }}</h3>
                    <p class="item-price">${{ formatPrice(item.price) }} each</p>
                  </div>
                  <div class="item-quantity">
                    <div class="quantity-controls">
                      <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"></path>
                        </svg>
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button @click="updateQuantity(item.id, item.quantity + 1)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 5v14m-7-7h14"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="item-total">
                    ${{ calculateItemTotal(item) }}
                  </div>
                  <button class="remove-item" @click="removeFromCart(item.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="summary-line">
                <span>Subtotal ({{ cartItemCount }} items)</span>
                <span>${{ cartSubtotal }}</span>
              </div>
              <div class="summary-line">
                <span>Delivery Fee</span>
                <span>${{ deliveryFee }}</span>
              </div>
              <div class="summary-line">
                <span>Tax</span>
                <span>${{ tax }}</span>
              </div>
              <div class="summary-line total">
                <span>Total</span>
                <span>${{ orderTotal }}</span>
              </div>
              <button class="btn btn-full" @click="nextStep">Continue to Delivery</button>
            </div>
          </div>

         
          <div v-if="currentStep === 2" class="checkout-step">
            <div class="step-content">
              <h2>Delivery Information</h2>
              <form @submit.prevent="nextStep" class="delivery-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="deliveryInfo.firstName" 
                      required
                      :class="{ 'error': errors.firstName }"
                    >
                    <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="deliveryInfo.lastName" 
                      required
                      :class="{ 'error': errors.lastName }"
                    >
                    <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="deliveryInfo.email" 
                    required
                    :class="{ 'error': errors.email }"
                  >
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="deliveryInfo.phone" 
                    required
                    :class="{ 'error': errors.phone }"
                  >
                  <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                </div>
                
                <div class="delivery-options">
                  <h3>Delivery Options</h3>
                  <div class="delivery-option">
                    <input type="radio" id="delivery" value="delivery" v-model="deliveryInfo.type">
                    <label for="delivery">
                      <div class="option-header">
                        <span class="option-title">Home Delivery</span>
                        <span class="option-price">$5.00</span>
                      </div>
                      <span class="option-description">Delivered to your doorstep in 30-45 minutes</span>
                    </label>
                  </div>
                  <div class="delivery-option">
                    <input type="radio" id="pickup" value="pickup" v-model="deliveryInfo.type">
                    <label for="pickup">
                      <div class="option-header">
                        <span class="option-title">Store Pickup</span>
                        <span class="option-price">Free</span>
                      </div>
                      <span class="option-description">Ready for pickup in 15-20 minutes</span>
                    </label>
                  </div>
                </div>
                
                <div v-if="deliveryInfo.type === 'delivery'" class="address-section">
                  <h3>Delivery Address</h3>
                  <div class="form-group">
                    <label for="address">Street Address *</label>
                    <input 
                      type="text" 
                      id="address" 
                      v-model="deliveryInfo.address" 
                      :required="deliveryInfo.type === 'delivery'"
                      :class="{ 'error': errors.address }"
                    >
                    <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="city">City *</label>
                      <input 
                        type="text" 
                        id="city" 
                        v-model="deliveryInfo.city" 
                        :required="deliveryInfo.type === 'delivery'"
                        :class="{ 'error': errors.city }"
                      >
                      <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
                    </div>
                    <div class="form-group">
                      <label for="zipCode">ZIP Code *</label>
                      <input 
                        type="text" 
                        id="zipCode" 
                        v-model="deliveryInfo.zipCode" 
                        :required="deliveryInfo.type === 'delivery'"
                        :class="{ 'error': errors.zipCode }"
                      >
                      <span v-if="errors.zipCode" class="error-message">{{ errors.zipCode }}</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="instructions">Delivery Instructions (Optional)</label>
                    <textarea 
                      id="instructions" 
                      v-model="deliveryInfo.instructions" 
                      rows="3"
                      placeholder="Any special instructions for delivery..."
                    ></textarea>
                  </div>
                </div>
                
                <div class="form-actions">
                  <button type="button" class="btn btn-outline" @click="prevStep">Back</button>
                  <button type="submit" class="btn">Continue to Payment</button>
                </div>
              </form>
            </div>
            
            <div class="order-summary">
              <h3>Order Summary</h3>
              <div class="summary-line">
                <span>Subtotal</span>
                <span>${{ cartSubtotal }}</span>
              </div>
              <div class="summary-line">
                <span>{{ deliveryInfo.type === 'delivery' ? 'Delivery Fee' : 'Pickup Fee' }}</span>
                <span>${{ deliveryFee }}</span>
              </div>
              <div class="summary-line">
                <span>Tax</span>
                <span>${{ tax }}</span>
              </div>
              <div class="summary-line total">
                <span>Total</span>
                <span>${{ orderTotal }}</span>
              </div>
            </div>
          </div>

   
          <div v-if="currentStep === 3" class="checkout-step">
            <div class="step-content">
              <h2>Payment Information</h2>
              <form @submit.prevent="processPayment" class="payment-form">
                <div class="payment-methods">
                  <h3>Payment Method</h3>
                  <div class="payment-option">
                    <input type="radio" id="card" value="card" v-model="paymentInfo.method">
                    <label for="card">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                        <line x1="2" x2="22" y1="10" y2="10"></line>
                      </svg>
                      Credit/Debit Card
                    </label>
                  </div>
                  <div class="payment-option">
                    <input type="radio" id="cash" value="cash" v-model="paymentInfo.method">
                    <label for="cash">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="12" x="2" y="6" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                      Cash on {{ deliveryInfo.type === 'delivery' ? 'Delivery' : 'Pickup' }}
                    </label>
                  </div>
                </div>
                
                <div v-if="paymentInfo.method === 'card'" class="card-details">
                  <div class="form-group">
                    <label for="cardName">Name on Card *</label>
                    <input 
                      type="text" 
                      id="cardName" 
                      v-model="paymentInfo.cardName" 
                      :required="paymentInfo.method === 'card'"
                      :class="{ 'error': errors.cardName }"
                    >
                    <span v-if="errors.cardName" class="error-message">{{ errors.cardName }}</span>
                  </div>
                  <div class="form-group">
                    <label for="cardNumber">Card Number *</label>
                    <input 
                      type="text" 
                      id="cardNumber" 
                      v-model="paymentInfo.cardNumber" 
                      placeholder="1234 5678 9012 3456"
                      :required="paymentInfo.method === 'card'"
                      :class="{ 'error': errors.cardNumber }"
                      @input="formatCardNumber"
                    >
                    <span v-if="errors.cardNumber" class="error-message">{{ errors.cardNumber }}</span>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label for="expiryDate">Expiry Date *</label>
                      <input 
                        type="text" 
                        id="expiryDate" 
                        v-model="paymentInfo.expiryDate" 
                        placeholder="MM/YY"
                        :required="paymentInfo.method === 'card'"
                        :class="{ 'error': errors.expiryDate }"
                        @input="formatExpiryDate"
                      >
                      <span v-if="errors.expiryDate" class="error-message">{{ errors.expiryDate }}</span>
                    </div>
                    <div class="form-group">
                      <label for="cvv">CVV *</label>
                      <input 
                        type="text" 
                        id="cvv" 
                        v-model="paymentInfo.cvv" 
                        placeholder="123"
                        :required="paymentInfo.method === 'card'"
                        :class="{ 'error': errors.cvv }"
                        maxlength="4"
                      >
                      <span v-if="errors.cvv" class="error-message">{{ errors.cvv }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="form-actions">
                  <button type="button" class="btn btn-outline" @click="prevStep">Back</button>
                  <button type="submit" class="btn" :disabled="isProcessing">
                    <span v-if="isProcessing">Processing...</span>
                    <span v-else>Place Order - ${{ orderTotal }}</span>
                  </button>
                </div>
              </form>
            </div>
            
            <div class="order-summary">
              <h3>Final Order</h3>
              <div class="order-items-summary">
                <div v-for="item in items" :key="item.id" class="summary-item">
                  <span>{{ item.name }} × {{ item.quantity }}</span>
                  <span>${{ calculateItemTotal(item) }}</span>
                </div>
              </div>
              <div class="summary-line">
                <span>Subtotal</span>
                <span>${{ cartSubtotal }}</span>
              </div>
              <div class="summary-line">
                <span>{{ deliveryInfo.type === 'delivery' ? 'Delivery Fee' : 'Pickup Fee' }}</span>
                <span>${{ deliveryFee }}</span>
              </div>
              <div class="summary-line">
                <span>Tax</span>
                <span>${{ tax }}</span>
              </div>
              <div class="summary-line total">
                <span>Total</span>
                <span>${{ orderTotal }}</span>
              </div>
            </div>
          </div>

         
          <div v-if="currentStep === 4" class="checkout-step confirmation-step">
            <div class="confirmation-content">
              <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>Order Confirmed!</h2>
              <p class="order-number">Order #{{ orderNumber }}</p>
              <p class="confirmation-message">
                Thank you for your order! We've sent a confirmation email to 
                <strong>{{ deliveryInfo.email }}</strong>
              </p>
              
              <div class="order-details">
                <div class="detail-section">
                  <h3>Order Summary</h3>
                  <div class="order-items-final">
                    <div v-for="item in confirmedOrder.items" :key="item.id" class="final-item">
                      <span>{{ item.name }} × {{ item.quantity }}</span>
                      <span>${{ calculateItemTotal(item) }}</span>
                    </div>
                  </div>
                  <div class="final-total">
                    <strong>Total: ${{ confirmedOrder.total }}</strong>
                  </div>
                </div>
                
                <div class="detail-section">
                  <h3>{{ deliveryInfo.type === 'delivery' ? 'Delivery' : 'Pickup' }} Information</h3>
                  <div class="delivery-details">
                    <p><strong>{{ deliveryInfo.firstName }} {{ deliveryInfo.lastName }}</strong></p>
                    <p>{{ deliveryInfo.phone }}</p>
                    <div v-if="deliveryInfo.type === 'delivery'">
                      <p>{{ deliveryInfo.address }}</p>
                      <p>{{ deliveryInfo.city }}, {{ deliveryInfo.zipCode }}</p>
                      <p v-if="deliveryInfo.instructions" class="instructions">
                        <em>Instructions: {{ deliveryInfo.instructions }}</em>
                      </p>
                    </div>
                    <div v-else>
                      <p>Ready for pickup at our store</p>
                      <p class="store-address">123 Coffee Street, Coffee City, CC 12345</p>
                    </div>
                  </div>
                </div>
                
                <div class="detail-section">
                  <h3>Estimated Time</h3>
                  <p class="estimated-time">
                    {{ deliveryInfo.type === 'delivery' ? '30-45 minutes' : '15-20 minutes' }}
                  </p>
                </div>
              </div>
              
              <div class="confirmation-actions">
                <router-link to="/menu" class="btn btn-outline">Order More</router-link>
                <router-link to="/" class="btn">Back to Home</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useCart } from '../store/cart.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { items, cartItemCount, cartSubtotal, removeFromCart, updateQuantity, clearCart } = useCart();

const currentStep = ref(1);
const isProcessing = ref(false);
const orderNumber = ref('');
const confirmedOrder = ref({});

const deliveryInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  type: 'delivery',
  address: '',
  city: '',
  zipCode: '',
  instructions: ''
});

const paymentInfo = ref({
  method: 'card',
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
});

const errors = ref({});

//
const deliveryFee = computed(() => {
  return deliveryInfo.value.type === 'delivery' ? 5 : 0;
});

const tax = computed(() => {
  return Math.round((cartSubtotal.value + deliveryFee.value) * 0.08 * 100) / 100;
});

const orderTotal = computed(() => {
  return cartSubtotal.value + deliveryFee.value + tax.value;
});




//////////// Methods
const formatPrice = (price) => {
  return price.replace(/\D/g, '');
};

const calculateItemTotal = (item) => {
  const priceValue = parseInt(formatPrice(item.price));
  return priceValue * item.quantity;
};

const nextStep = () => {
  if (validateCurrentStep()) {
    currentStep.value++;
    window.scrollTo(0, 0);
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo(0, 0);
  }
};

const validateCurrentStep = () => {
  errors.value = {};
  
  if (currentStep.value === 2) {
    if (!deliveryInfo.value.firstName.trim()) {
      errors.value.firstName = 'First name is required';
    }
    if (!deliveryInfo.value.lastName.trim()) {
      errors.value.lastName = 'Last name is required';
    }
    if (!deliveryInfo.value.email.trim()) {
      errors.value.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(deliveryInfo.value.email)) {
      errors.value.email = 'Please enter a valid email';
    }
    if (!deliveryInfo.value.phone.trim()) {
      errors.value.phone = 'Phone number is required';
    }
    
    if (deliveryInfo.value.type === 'delivery') {
      if (!deliveryInfo.value.address.trim()) {
        errors.value.address = 'Address is required';
      }
      if (!deliveryInfo.value.city.trim()) {
        errors.value.city = 'City is required';
      }
      if (!deliveryInfo.value.zipCode.trim()) {
        errors.value.zipCode = 'ZIP code is required';
      }
    }
  }
  
  return Object.keys(errors.value).length === 0;
};

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
  let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
  paymentInfo.value.cardNumber = formattedValue;
};

const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  paymentInfo.value.expiryDate = value;
};

const processPayment = async () => {
  if (!validatePayment()) return;
  
  isProcessing.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  orderNumber.value = generateOrderNumber();
  

  confirmedOrder.value = {
    items: [...items.value],
    total: orderTotal.value,
    deliveryInfo: { ...deliveryInfo.value },
    paymentMethod: paymentInfo.value.method
  };
  
  isProcessing.value = false;
  currentStep.value = 4;
  

  setTimeout(() => {
    clearCart();
  }, 1000);
};

const validatePayment = () => {
  errors.value = {};
  
  if (paymentInfo.value.method === 'card') {
    if (!paymentInfo.value.cardName.trim()) {
      errors.value.cardName = 'Name on card is required';
    }
    if (!paymentInfo.value.cardNumber.trim()) {
      errors.value.cardNumber = 'Card number is required';
    }
    if (!paymentInfo.value.expiryDate.trim()) {
      errors.value.expiryDate = 'Expiry date is required';
    }
    if (!paymentInfo.value.cvv.trim()) {
      errors.value.cvv = 'CVV is required';
    }
  }
  
  return Object.keys(errors.value).length === 0;
};

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `BC${timestamp}${random}`;
};

// Watch for delivery type changes to update delivery fee
watch(() => deliveryInfo.value.type, () => {
  // Delivery fee will be recalculated automatically via computed property
});
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: var(--background-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  background: var(--accent);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Empty Cart State */
.empty-checkout {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  margin: 2rem 0;
}

.empty-cart-icon {
  color: var(--primary-light);
  margin-bottom: 2rem;
}

.empty-checkout h2 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.empty-checkout p {
  color: var(--text);
  margin-bottom: 2rem;
}

/* Checkout Steps */
.checkout-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
}

.step.active .step-circle {
  background: var(--primary);
  color: white;
}

.step.completed .step-circle {
  background: #28a745;
  color: white;
}

.step-label {
  font-size: 0.9rem;
  color: var(--text);
  text-align: center;
}

.step.active .step-label {
  color: var(--primary);
  font-weight: 600;
}

.step-line {
  width: 100px;
  height: 2px;
  background: #e0e0e0;
  margin: 0 1rem;
  transition: all 0.3s;
}

.step-line.completed {
  background: #28a745;
}


.checkout-main {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.checkout-step {
  display: contents;
}

.step-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
}

.step-content h2 {
  color: var(--accent);
  margin-bottom: 2rem;
}

/* Order Items */
.order-items {
  margin-bottom: 2rem;
}

.order-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--background-light);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.item-image {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
}

.item-details h3 {
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.item-price {
  color: var(--text);
  font-size: 0.9rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--background-light);
  border-radius: 0.5rem;
  padding: 0.25rem;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-controls button:hover:not(:disabled) {
  background: var(--background-light);
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-weight: 600;
  color: var(--primary-dark);
}

.remove-item {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.remove-item:hover {
  background: #f8d7da;
}

/* Order Summary */
.order-summary {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.order-summary h3 {
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

.summary-line.total {
  border-top: 2px solid var(--background-light);
  padding-top: 1rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--primary-dark);
}

.order-items-summary {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--background-light);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* Forms */
.delivery-form,
.payment-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 2px solid var(--background-light);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Delivery Options */
.delivery-options {
  margin: 2rem 0;
}

.delivery-options h3 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.delivery-option {
  border: 2px solid var(--background-light);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}

.delivery-option:has(input:checked) {
  border-color: var(--primary);
  background: var(--background-light);
}

.delivery-option input {
  display: none;
}

.delivery-option label {
  display: block;
  padding: 1rem;
  cursor: pointer;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.option-title {
  font-weight: 600;
  color: var(--accent);
}

.option-price {
  font-weight: 600;
  color: var(--primary-dark);
}

.option-description {
  color: var(--text);
  font-size: 0.9rem;
}


.payment-methods {
  margin-bottom: 2rem;
}

.payment-methods h3 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.payment-option {
  border: 2px solid var(--background-light);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}

.payment-option:has(input:checked) {
  border-color: var(--primary);
  background: var(--background-light);
}

.payment-option input {
  display: none;
}

.payment-option label {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  font-weight: 600;
  color: var(--accent);
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:not(.btn-outline) {
  background: var(--primary);
  color: white;
}

.btn:not(.btn-outline):hover:not(:disabled) {
  background: var(--primary-dark);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}

.btn-full {
  width: 100%;
  margin-top: 1rem;
}

/* Confirmation Step */
.confirmation-step {
  grid-column: 1 / -1;
}

.confirmation-content {
  text-align: center;
  padding: 3rem;
}

.success-icon {
  color: #28a745;
  margin-bottom: 2rem;
}

.confirmation-content h2 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.order-number {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 1rem;
}

.confirmation-message {
  color: var(--text);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.order-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  text-align: left;
}

.detail-section {
  background: var(--background-light);
  padding: 2rem;
  border-radius: 0.5rem;
}

.detail-section h3 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.order-items-final {
  margin-bottom: 1rem;
}

.final-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.final-total {
  border-top: 1px solid var(--background);
  padding-top: 1rem;
  color: var(--primary-dark);
}

.delivery-details p {
  margin-bottom: 0.5rem;
}

.instructions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--background);
}

.store-address {
  color: var(--text);
  font-style: italic;
}

.estimated-time {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.confirmation-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .checkout-main {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
  
  .checkout-steps {
    padding: 1rem;
  }
  
  .step-line {
    width: 50px;
  }
  
  .step-label {
    font-size: 0.8rem;
  }
  
  .order-item {
    grid-template-columns: 60px 1fr;
    gap: 1rem;
  }
  
  .item-quantity,
  .item-total,
  .remove-item {
    grid-column: 1 / -1;
    justify-self: start;
    margin-top: 0.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .order-details {
    grid-template-columns: 1fr;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .step-content {
    padding: 1rem;
  }
  
  .order-summary {
    padding: 1rem;
  }
  
  .checkout-steps {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .step-line {
    display: none;
  }
}
</style>
