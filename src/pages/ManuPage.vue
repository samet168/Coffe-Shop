<template>
  <div class="menu-page">
    <div class="page-header">
      <h1>Menu</h1>
      <p>Discover our selection of premium coffees and delicious treats</p>
    </div>

    <div class="menu-container">
      <div class="menu-category">
        <h2>Hot Coffees</h2>
        <div class="menu-items">
          <div class="menu-item" v-for="(item, index) in hotCoffees" :key="index">
            <div class="menu-item-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
            <div class="menu-item-content">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="menu-item-footer">
                <span class="price">{{ item.price }}</span>
                <router-link :to="`/product/${item.slug}`" class="btn-small">View Details</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="menu-category">
        <h2>Cold Coffees</h2>
        <div class="menu-items">
          <div class="menu-item" v-for="(item, index) in coldCoffees" :key="index">
            <div class="menu-item-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
            <div class="menu-item-content">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="menu-item-footer">
                <span class="price">{{ item.price }}</span>
                <router-link :to="`/product/${item.slug}`" class="btn-small">View Details</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="menu-category">
        <h2>Milkshakes</h2>
        <div class="menu-items">
          <div class="menu-item" v-for="(item, index) in milkshakes" :key="index">
            <div class="menu-item-image" :style="{ backgroundImage: `url(${item.image})` }"></div>
            <div class="menu-item-content">
              <h3>{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <div class="menu-item-footer">
                <span class="price">{{ item.price }}</span>
                <router-link :to="`/product/${item.slug}`" class="btn-small">View Details</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const hotCoffees = ref([
  {
    name: 'Espresso',
    slug: 'espresso',
    description: 'Rich and intense coffee served in a small cup',
    price: '6$',
    image: '/src/assets//imgMenu/p1.jpg'
  },
  {
    name: 'Cappuccino',
    slug: 'cappuccino',
    description: 'Espresso with steamed milk and a deep layer of foam',
    price: '6$',
    image: '/src/assets//imgMenu/p2.jpg'
  },
  {
    name: 'Latte',
    slug: 'latte',
    description: 'Espresso with a lot of steamed milk and a light layer of foam',
    price: '12$',
    image: '/src/assets//imgMenu/p3.jpg'
  },
  {
    name: 'Mocha',
    slug: 'mocha',
    description: 'Espresso with chocolate, steamed milk and whipped cream',
    price: '4$',
    image: '/src/assets//imgMenu/p4.jpg'
  }
]);

const coldCoffees = ref([
  {
    name: 'Iced Latte',
    slug: 'iced-latte',
    description: 'Espresso with cold milk and ice cubes',
    price: '3$',
    image: '/src/assets/imgMenu/coldCoffees/p1.jpg'
  },
  {
    name: 'Cold Brew',
    slug: 'cold-brew',
    description: 'Coffee brewed with cold water for 12+ hours',
    price: '4$',
    image: '/src/assets/imgMenu/coldCoffees/p2.jpg'
  },
  {
    name: 'Frappuccino',
    slug: 'frappuccino',
    description: 'Blended coffee with ice and whipped cream',
    price: '5$',
    image: '/src/assets/imgMenu/coldCoffees/p3.jpg'
  }
]);

const milkshakes = ref([
  {
    name: 'Biscoff Milkshake',
    slug: 'biscoff-milkshake',
    description: 'Creamy milkshake with Lotus Biscoff cookies and caramel',
    price: '6$',
    image: '/src/assets/imgMenu/milkshakes/p1.jpg '
  },
  {
    name: 'Salted Caramel Milkshake',
    slug: 'salted-caramel-milkshake',
    description: 'Sweet and salty caramel milkshake with whipped cream',
    price: '2$',
    image: '/src/assets/imgMenu/milkshakes/p2.jpg '
  },
  {
    name: 'Chocolate Milkshake',
    slug: 'chocolate-milkshake',
    description: 'Rich chocolate milkshake topped with chocolate shavings',
    price: '5%',
    image: '/src/assets/imgMenu/milkshakes/p3.jpg '
  }
]);
</script>

<style scoped>
.menu-page {
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  background-color: var(--background-light);
  border-radius: 0.5rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--accent);
}

.page-header p {
  font-size: 1.2rem;
  color: var(--text);
}

.menu-container {
  max-width: 1200px;
  margin: 0 auto;
}

.menu-category {
  margin-bottom: 3rem;
}

.menu-category h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary);
  color: var(--accent);
}

.menu-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.menu-item {
  background-color: var(--background-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.menu-item:hover {
  transform: translateY(-5px);
}

.menu-item-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}

.menu-item-content {
  padding: 1.5rem;
}

.menu-item-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--accent);
}

.menu-item-content p {
  color: var(--text);
  margin-bottom: 1rem;
}

.menu-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--primary-dark);
}

@media (max-width: 768px) {
  .menu-items {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .menu-items {
    grid-template-columns: 1fr;
  }
}
</style>