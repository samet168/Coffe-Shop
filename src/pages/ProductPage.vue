
<template>
  <div class="product-page">

    <div class="product-hero" v-if="product">
      <div class="hero-background" :style="{ backgroundImage: `url(${product.image})` }"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="product-badge">{{ product.category }}</div>
        <h1 class="hero-title">{{ product.name }}</h1>
        <p class="hero-subtitle">{{ product.description }}</p>
        <div class="hero-rating">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= product.rating }">★</span>
          </div>
          <span class="rating-text">{{ product.rating }} ({{ product.reviews }} reviews)</span>
        </div>
      </div>
    </div>
    <div v-else class="loading-page">
      <div class="loading-spinner"></div>
      <p>Loading product...</p>
    </div>


    <div class="product-details-section" v-if="product">
      <div class="container">
        <div class="product-grid">
          


          <div class="product-images">
            <div class="main-image" :style="{ backgroundImage: `url(${product.image})` }">
              <div class="image-overlay">
                <button class="zoom-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                    <path d="M11 8a3 3 0 1 0 0 6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="thumbnail-images">
              <div class="thumbnail active" :style="{ backgroundImage: `url(${product.image})` }"></div>
              <div class="thumbnail" :style="{ backgroundImage: `url(${getAlternateImage(product.image, 1)})` }"></div>
              <div class="thumbnail" :style="{ backgroundImage: `url(${getAlternateImage(product.image, 2)})` }"></div>
            </div>
          </div>

      
          <div class="product-info">
            <div class="product-header">
              <h2>{{ product.name }}</h2>
              <div class="price-section">
                <span class="current-price">${{ formatPrice(product.price) }}</span>
                <span class="original-price">${{ (parseInt(formatPrice(product.price)) * 1.2).toFixed(0) }}</span>
                <span class="discount-badge">17% OFF</span>
              </div>
            </div>

            <div class="product-features">
              <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2v20m8-10H4"></path>
                </svg>
                <span>Premium Quality Beans</span>
              </div>
              <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>Fresh Roasted Daily</span>
              </div>
              <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span>Expertly Crafted</span>
              </div>
            </div>

            <div class="product-description">
              <p>{{ product.fullDescription }}</p>
            </div>

            <div class="ingredients-section" v-if="product.ingredients">
              <h4>Ingredients</h4>
              <div class="ingredients-list">
                <span v-for="ingredient in product.ingredients" :key="ingredient" class="ingredient-tag">
                  {{ ingredient }}
                </span>
              </div>
            </div>

          
            <div class="size-selection" v-if="product.slug === 'espresso'">
              <h4>Size</h4>
              <div class="size-options">
                <button 
                  v-for="size in espressoSizes" 
                  :key="size.name"
                  @click="selectedSize = size"
                  :class="{ 'active': selectedSize.name === size.name }"
                  class="size-option"
                >
                  <span class="size-name">{{ size.name }}</span>
                  <span class="size-volume">{{ size.volume }}</span>
                  <span class="size-price">+${{ size.extraPrice }}</span>
                </button>
              </div>
            </div>

           
            <div class="purchase-section">
              <div class="quantity-selector">
                <label>Quantity</label>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity" :disabled="quantity <= 1" class="qty-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <span class="quantity-display">{{ quantity }}</span>
                  <button @click="increaseQuantity" class="qty-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 5v14m-7-7h14"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="total-price">
                <span class="total-label">Total:</span>
                <span class="total-amount">${{ calculateTotal() }}</span>
              </div>

              <div class="action-buttons">
                <button 
                  class="btn-primary add-to-cart"
                  @click="handleAddToCart"
                  :disabled="isAddingToCart"
                >
                  <svg v-if="!isAddingToCart" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  <div v-else class="loading-spinner"></div>
                  {{ isAddingToCart ? 'Adding...' : 'Add to Cart' }}
                </button>
                
                <button class="btn-secondary buy-now" @click="handleBuyNow">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  </svg>
                  Buy Now
                </button>
              </div>

              <div class="delivery-info">
                <div class="delivery-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M15 18H9"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                  </svg>
                  <span>Free delivery on orders over $50</span>
                </div>
                <div class="delivery-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 3h18v18H3zM9 9h6v6H9z"></path>
                  </svg>
                  <span>Ready in 15-20 minutes</span>
                </div>
              </div>
            </div>

            <div v-if="addedToCart" class="success-notification">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Successfully added to cart!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-page">
      <div class="loading-spinner"></div>
      <p>Loading product...</p>
    </div>

 
    <div class="tabs-section" v-if="product">
      <div class="container">
        <div class="tabs-header">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            @click="activeTab = tab.id"
            :class="{ 'active': activeTab === tab.id }"
            class="tab-button"
          >
            {{ tab.name }}
          </button>
        </div>
        <div class="tab-content">
          <div v-if="activeTab === 'description'" class="description-tab">
            <h3>About This Coffee</h3>
            <div class="description-content">
              <p>{{ product.fullDescription }}</p>
              <div class="coffee-specs" v-if="product.slug === 'espresso'">
                <div class="spec-item">
                  <strong>Origin:</strong> Single-origin Colombian beans
                </div>
                <div class="spec-item">
                  <strong>Roast Level:</strong> Medium-Dark
                </div>
                <div class="spec-item">
                  <strong>Flavor Notes:</strong> Chocolate, Caramel, Nutty
                </div>
                <div class="spec-item">
                  <strong>Caffeine Content:</strong> High (75mg per shot)
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeTab === 'reviews'" class="reviews-tab">
            <div class="reviews-header">
              <h3>Customer Reviews</h3>
              <div class="reviews-summary">
                <div class="average-rating">
                  <span class="rating-number">{{ product.rating }}</span>
                  <div class="stars">
                    <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= product.rating }">★</span>
                  </div>
                  <span class="total-reviews">{{ product.reviews }} reviews</span>
                </div>
              </div>
            </div>
            <div class="reviews-list">
              <div class="review" v-for="(review, index) in product.reviewsList" :key="index">
                <div class="review-header">
                  <div class="reviewer-info">
                    <div class="reviewer-avatar">{{ review.author.charAt(0) }}</div>
                    <div class="reviewer-details">
                      <div class="reviewer-name">{{ review.author }}</div>
                      <div class="review-date">{{ review.date }}</div>
                    </div>
                  </div>
                  <div class="review-rating">
                    <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= review.rating }">★</span>
                  </div>
                </div>
                <div class="review-content">{{ review.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-page">
      <div class="loading-spinner"></div>
      <p>Loading product...</p>
    </div>

   
    <div class="related-section" v-if="product">
      <div class="container">
        <h2>You May Also Like</h2>
        <div class="related-grid">
          <div class="related-item" v-for="(item, index) in relatedProducts" :key="index">
            <router-link :to="`/product/${item.slug}`" class="related-link">
              <div class="related-image" :style="{ backgroundImage: `url(${item.image})` }">
                <div class="related-overlay">
                  <span class="view-product">View Product</span>
                </div>
              </div>
              <div class="related-info">
                <h4>{{ item.name }}</h4>
                <div class="related-rating">
                  <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= item.rating }">★</span>
                  <span class="rating-text">({{ item.reviews }})</span>
                </div>
                <div class="related-price">${{ formatPrice(item.price) }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-page">
      <div class="loading-spinner"></div>
      <p>Loading product...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCart } from '../store/cart.js';

const route = useRoute();
const router = useRouter();
const { addToCart } = useCart();

const productId = computed(() => route.params.id);
const quantity = ref(1);
const activeTab = ref('description');
const isAddingToCart = ref(false);
const addedToCart = ref(false);
const selectedSize = ref({ name: 'Single', volume: '30ml', extraPrice: 0 });

const espressoSizes = [
  { name: 'Single', volume: '30ml', extraPrice: 0 },
  { name: 'Double', volume: '60ml', extraPrice: 2 },
  { name: 'Triple', volume: '90ml', extraPrice: 4 }
];

const tabs = [
  { id: 'description', name: 'Description' },
  { id: 'reviews', name: 'Reviews' }
];

const allProducts = ref([
  {
    id: 'espresso',
    slug: 'espresso',
    name: 'Premium Espresso',
    description: 'Rich and intense coffee served in a small cup',
    fullDescription: "Our premium espresso is crafted with precision using single-origin Colombian coffee beans that are roasted to perfection. The result is a rich, intense flavor with a beautiful golden crema on top. Each shot delivers complex notes of chocolate and caramel with a smooth, velvety finish. Served in a pre-warmed cup, this is the perfect quick coffee fix for those who appreciate the pure essence of coffee.",
    price: '5M',
    image: '/src/assets/imgProduct/p1.jpg',
    category: 'Hot Coffee',
    rating: 4.8,
    reviews: 124,
    ingredients: ['Premium Coffee beans', 'Filtered Water'],
    reviewsList: [
      { author: 'Coffee Lover', date: '2023-05-15', rating: 5, content: 'Perfect espresso! Rich flavor and beautiful crema. The best I\'ve had outside of Italy.' },
      { author: 'Morning Person', date: '2023-04-22', rating: 4, content: 'Great taste, just what I need to start my day. Strong and flavorful.' },
      { author: 'Barista Mike', date: '2023-03-10', rating: 5, content: 'As a professional barista, I can say this is exceptional quality. Perfect extraction every time.' }
    ]
  },
  {
    id: 'latte',
    slug: 'latte',
    name: 'Creamy Latte',
    description: 'Espresso with steamed milk and light foam',
    fullDescription: "Our signature latte combines a shot of our premium espresso with perfectly steamed milk and a light layer of microfoam on top. The result is a smooth, creamy coffee that's perfect for those who enjoy a milder coffee flavor. Our skilled baristas are trained to create beautiful latte art on each cup, making every drink a work of art.",
    price: '10M',
    image: '/src/assets/imgProduct/p2.jpg',
    category: 'Hot Coffee',
    rating: 4.6,
    reviews: 98,
    ingredients: ['Espresso', 'Steamed milk', 'Milk foam'],
    reviewsList: [
      { author: 'Latte Fan', date: '2023-06-01', rating: 5, content: 'The latte art is always beautiful and the taste is amazing!' },
      { author: 'Coffee Enthusiast', date: '2023-05-12', rating: 4, content: 'Smooth and creamy, just how I like it.' }
    ]
  },
  {
    id: 'mocha',
    slug: 'mocha',
    name: 'Chocolate Mocha',
    description: 'Espresso with chocolate and steamed milk',
    fullDescription: "Our indulgent mocha is the perfect blend of our premium espresso, rich Belgian chocolate, steamed milk, and topped with whipped cream. It's the ideal choice for those who love the combination of coffee and chocolate. Each sip offers a delightful balance of bitter coffee and sweet chocolate, creating a dessert-like experience in a cup.",
    price: '3M',
    image: '/src/assets/imgProduct/p3.jpg',
    category: 'Hot Coffee',
    rating: 4.7,
    reviews: 112,
    ingredients: ['Espresso', 'Belgian Chocolate', 'Steamed milk', 'Whipped cream'],
    reviewsList: [
      { author: 'Chocolate Lover', date: '2023-06-10', rating: 5, content: 'The perfect blend of coffee and chocolate!' },
      { author: 'Sweet Tooth', date: '2023-05-25', rating: 5, content: 'My favorite drink! I get this every time I visit.' }
    ]
  },
  {
    id: 'biscoff-milkshake',
    slug: 'biscoff-milkshake',
    name: 'Biscoff Milkshake',
    description: 'Creamy milkshake with Lotus Biscoff cookies',
    fullDescription: "Our Biscoff Milkshake is a creamy delight made with premium vanilla ice cream, fresh milk, and crushed Lotus Biscoff cookies. Topped with whipped cream, caramel sauce, and more crushed Biscoff cookies, it's a sweet treat that's perfect for any time of day. The unique spiced flavor of Biscoff cookies creates an unforgettable taste experience.",
    price: '9M',
    image: '/src/assets/imgProduct/p4.jpg',
    category: 'Milkshakes',
    rating: 4.9,
    reviews: 87,
    ingredients: ['Vanilla ice cream', 'Fresh milk', 'Lotus Biscoff cookies', 'Caramel sauce', 'Whipped cream'],
    reviewsList: [
      { author: 'Milkshake Enthusiast', date: '2023-06-15', rating: 5, content: 'The Biscoff flavor is amazing! So creamy and delicious.' },
      { author: 'Sweet Lover', date: '2023-06-02', rating: 5, content: "Best milkshake I've ever had!" }
    ]
  }
]);

const product = computed(() => {
  return allProducts.value.find(p => p.slug === productId.value) || null;
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return allProducts.value
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 3);
});

const formatPrice = (price) => {
  return price.replace(/\D/g, '');
};

const getAlternateImage = (baseImage, index) => {

  const variations = [
    baseImage.replace('w=500', 'w=600'),
    baseImage.replace('q=60', 'q=80'),
    baseImage.replace('fit=crop', 'fit=fill')
  ];
  return variations[index] || baseImage;
};

const calculateTotal = () => {
  const basePrice = parseInt(formatPrice(product.value.price));
  const sizePrice = selectedSize.value.extraPrice;
  return ((basePrice + sizePrice) * quantity.value).toFixed(0);
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleAddToCart = async () => {
  if (!product.value) return;
  
  isAddingToCart.value = true;
  
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const productToAdd = {
    ...product.value,
    selectedSize: selectedSize.value,
    price: `${parseInt(formatPrice(product.value.price)) + selectedSize.value.extraPrice}M`
  };
  
  addToCart(productToAdd, quantity.value);
  
  addedToCart.value = true;
  isAddingToCart.value = false;
  
  setTimeout(() => {
    addedToCart.value = false;
  }, 3000);
  
  quantity.value = 1;
};

const handleBuyNow = async () => {
  await handleAddToCart();
  setTimeout(() => {
    router.push('/checkout');
  }, 1000);
};
</script>

<style scoped>
.product-page {
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}


.product-hero {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  transform: scale(1.1);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(74, 44, 23, 0.8), rgba(139, 90, 43, 0.6));
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 2rem;
}

.product-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.5rem;
}

.star.filled {
  color: #ffc107;
}

.rating-text {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Product Details Section */
.product-details-section {
  padding: 4rem 0;
  background: white;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* Product Images */
.product-images {
  position: sticky;
  top: 2rem;
}

.main-image {
  position: relative;
  height: 500px;
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.main-image:hover .image-overlay {
  opacity: 1;
}

.zoom-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.zoom-btn:hover {
  transform: scale(1.1);
}

.thumbnail-images {
  display: flex;
  gap: 1rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.thumbnail.active,
.thumbnail:hover {
  opacity: 1;
}


.product-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-header h2 {
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 1rem;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-dark);
}

.original-price {
  font-size: 1.5rem;
  color: #999;
  text-decoration: line-through;
}

.discount-badge {
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text);
}

.feature-item svg {
  color: var(--primary);
}

.product-description p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
}

.ingredients-section h4 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ingredient-tag {
  background: var(--background-light);
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
}


.size-selection h4 {
  color: var(--accent);
  margin-bottom: 1rem;
}

.size-options {
  display: flex;
  gap: 1rem;
}

.size-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 2px solid var(--background-light);
  border-radius: 0.75rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 100px;
}

.size-option.active {
  border-color: var(--primary);
  background: var(--background-light);
}

.size-option:hover {
  border-color: var(--primary-light);
}

.size-name {
  font-weight: 600;
  color: var(--accent);
}

.size-volume {
  font-size: 0.9rem;
  color: var(--text);
  margin: 0.25rem 0;
}

.size-price {
  font-size: 0.8rem;
  color: var(--primary-dark);
  font-weight: 500;
}

/* Purchase Section */
.purchase-section {
  background: var(--background-light);
  padding: 2rem;
  border-radius: 1rem;
}

.quantity-selector {
  margin-bottom: 1.5rem;
}

.quantity-selector label {
  display: block;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.qty-btn {
  width: 40px;
  height: 40px;
  border: 2px solid var(--primary);
  background: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.qty-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent);
  min-width: 40px;
  text-align: center;
}

.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

.total-label {
  font-size: 1.2rem;
  color: var(--text);
}

.total-amount {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--accent);
  color: white;
}

.btn-secondary:hover {
  background: #3a2313;
  transform: translateY(-2px);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.delivery-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.delivery-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text);
  font-size: 0.95rem;
}

.delivery-item svg {
  color: var(--primary);
}

.success-notification {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #c3e6cb;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tabs Section */
.tabs-section {
  padding: 4rem 0;
  background: var(--background-light);
}

.tabs-header {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.tab-button {
  padding: 1rem 2rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
  transition: all 0.3s;
}

.tab-button.active {
  color: var(--primary-dark);
  border-bottom-color: var(--primary-dark);
}

.tab-button:hover {
  color: var(--primary-dark);
}

.tab-content {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.description-tab h3,
.reviews-header h3 {
  color: var(--accent);
  font-size: 2rem;
  margin-bottom: 2rem;
}

.description-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 2rem;
}

.coffee-specs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.spec-item {
  background: var(--background-light);
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.spec-item strong {
  color: var(--accent);
}

/* Reviews */
.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.reviews-summary {
  text-align: right;
}

.average-rating {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rating-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-dark);
}

.total-reviews {
  color: var(--text);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.review {
  background: var(--background-light);
  padding: 2rem;
  border-radius: 1rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.reviewer-avatar {
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.reviewer-name {
  font-weight: 600;
  color: var(--accent);
}

.review-date {
  color: #777;
  font-size: 0.9rem;
}

.review-content {
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--text);
}

/* Related Products */
.related-section {
  padding: 4rem 0;
  background: white;
}

.related-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: var(--accent);
  margin-bottom: 3rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.related-item {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.related-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.related-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.related-image {
  position: relative;
  height: 250px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.related-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(74, 44, 23, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.related-item:hover .related-overlay {
  opacity: 1;
}

.view-product {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.related-info {
  padding: 2rem;
}

.related-info h4 {
  font-size: 1.3rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.related-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.related-rating .rating-text {
  color: #777;
  font-size: 0.9rem;
}

.related-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-dark);
}

/* Loading Page */
.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  gap: 2rem;
}

.loading-page .loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--background-light);
  border-top: 4px solid var(--primary);
}

.loading-page p {
  font-size: 1.3rem;
  color: var(--primary-dark);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .product-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .main-image {
    height: 300px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .size-options {
    flex-direction: column;
  }
  
  .average-rating {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .reviews-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-content {
    padding: 1rem;
  }
  
  .product-details-section {
    padding: 2rem 0;
  }
  
  .tab-content {
    padding: 2rem 1rem;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style>
