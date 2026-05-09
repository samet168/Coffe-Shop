<template>
  <div>
   
    <section class="hero">
      <div class="hero-content">
        <h2>Freshly Roasted</h2>
        <h1>COFFEE</h1>
        <button class="btn">Shop Now</button>
      </div>
    </section>

    <section class="categories">
      <h2 class="section-title">TOP CATEGORIES</h2>
      <p class="section-subtitle">Explore The Recent Most Bought Drinks This Week</p>
      
      <div class="category-grid">
        <div class="category-card" v-for="(category, index) in categories" :key="index">
          <router-link :to="`/product/${category.slug}`">
            <div class="category-img" :style="{ backgroundImage: `url(${category.image})` }"></div>
            <div class="category-name">{{ category.name }}</div>
          </router-link>
        </div>
      </div>
    </section>

  
    <section class="milkshakes">
      <h2 class="section-title">TOP Milk Shakes</h2>
      <p class="section-subtitle">Explore The Recent Most Bought Shakes This Week</p>
      
      <div class="milkshake-grid">
        <div class="milkshake-card" v-for="(shake, index) in milkshakes" :key="index">
          <div class="like-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            <span>{{ shake.likes }}</span>
          </div>
          <router-link :to="`/product/${shake.slug}`">
            <div class="milkshake-img" :style="{ backgroundImage: `url(${shake.image})` }"></div>
            <div class="milkshake-info">
              <h3>{{ shake.name }}</h3>
              <div class="milkshake-footer">
                <span class="price">{{ shake.price }}</span>
                <button class="btn-small">Buy Now</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const categories = ref([
  { 
    name: 'Hot Chocolate', 
    slug: 'hot-chocolate',
    image: '/src/assets/imgHome/p1.jpg' 
  },
  { 
    name: 'Espresso Coffee', 
    slug: 'espresso',
    image: '/src/assets/imgHome/p2.jpg' 
  },
  { 
    name: 'Mocha Coffee', 
    slug: 'mocha',
    image: '/src/assets/imgHome/p3.jpg' 
  },
  { 
    name: 'Latte Coffee', 
    slug: 'latte',
    image: '/src/assets/imgHome/p4.jpg' 
  }
]);

const milkshakes = ref([
  { 
    name: 'Biscoff Milkshakes', 
    slug: 'biscoff-milkshake',
    image: '/src/assets/imgHome//milkshakes/p1.jpg',
    likes: 30,
    price: '200M'
  },
  { 
    name: 'Salted Caramel Milkshakes', 
    slug: 'salted-caramel-milkshake',
    image: '/src/assets/imgHome//milkshakes/p2.jpg',
    likes: 50,
    price: '200M'
  },
  { 
    name: 'Decadent Chocolate Milkshakes', 
    slug: 'chocolate-milkshake-decadent',
    image: '/src/assets/imgHome//milkshakes/p3.jpg',
    likes: 100,
    price: '200M'
  },
  { 
    name: 'Chocolate Milkshakes', 
    slug: 'chocolate-milkshake',
    image: '/src/assets/imgHome//milkshakes/p4.jpg',
    likes: 40,
    price: '200M'
  }
]);
</script>

<style scoped>

.hero {
  height: 400px;
  background-image: url('/src/assets/imgHome/b.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding-left: 4rem;
  color: var(--text-light);
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h2 {
  font-size: 2rem;
  font-weight: 400;
}

.hero h1 {
  font-size: 4rem;
  letter-spacing: 0.2rem;
  margin-bottom: 2rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  position: relative;
  height: 150px;
  border-radius: 0.5rem;
  overflow: hidden;
}

.category-card a {
  text-decoration: none;
  color: inherit;
}

.category-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
}

.category-card:hover .category-img {
  transform: scale(1.05);
}

.category-name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--text-light);
  font-weight: 500;
  text-align: center;
}

/* Milkshakes */
.milkshake-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.milkshake-card {
  position: relative;
  height: 250px;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: var(--background-light);
}

.milkshake-card a {
  text-decoration: none;
  color: inherit;
}

.like-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: white;
  color: var(--text);
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 500;
  z-index: 1;
}

.milkshake-img {
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center;
}

.milkshake-info {
  padding: 1rem;
}

.milkshake-info h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.milkshake-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 500;
}

@media (max-width: 768px) {
  .hero {
    padding-left: 2rem;
  }
  
  .hero h1 {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 2.5rem;
  }
}
</style>