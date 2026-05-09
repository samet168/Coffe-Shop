<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <div class="logo">
        <div class="logo-icon">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 40C80 57.3 65.3 70 48 70C30.7 70 16 57.3 16 40C16 22.7 30.7 10 48 10" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
            <path d="M48 10C56.3 10 63.5 12.5 68 17" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
            <path d="M80 40H90C93.3 40 96 42.7 96 46V50C96 60.5 87.5 69 77 69H70" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
            <path d="M30 85L66 85" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="logo-text">Black Coffee</div>
      </div>
      <nav class="nav">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/menu">Menu</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/media">Media</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>
      <div class="header-actions">
        <div class="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <Cart />
      </div>
    </header>

    <!-- Router View -->
    <router-view />

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-column">
          <h3>Products</h3>
          <ul>
            <li><router-link to="/product/mocha">Mocha Coffee</router-link></li>
            <li><router-link to="/product/espresso">Espresso Coffee</router-link></li>
            <li><router-link to="/product/latte">Latte Coffee</router-link></li>
            <li><router-link to="/product/biscoff-milkshake">Milk Shakes</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Category</h3>
          <ul>
            <li><router-link to="/menu">Menu</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Company Info</h3>
          <ul>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
            <li><router-link to="/support">Support</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="https://www.instagram.com/sametmoeun99/" class="social-icon instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://web.facebook.com/samet.moeunsamet/" class="social-icon facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/@Samet99448" class="social-icon youtube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                <path d="m10 15 5-3-5-3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Cart from './components/Cart.vue';
</script>

<style>
:root {
  --primary: #8b5a2b;
  --primary-dark: #6b4423;
  --primary-light: #c49a6c;
  --background: #d4a076;
  --background-light: #e8c8ad;
  --text: #2d2013;
  --text-light: #ffffff;
  --accent: #4a2c17;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: var(--background);
  color: var(--text);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--background);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
}

.logo-icon {
  width: 50px;
  height: 50px;
  color: var(--text);
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  font-style: italic;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover, .nav a.active, .router-link-active {
  color: var(--primary-dark);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search {
  cursor: pointer;
}

/* Footer */
.footer {
  background-color: #3a2313;
  color: var(--text-light);
  padding: 3rem 2rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column h3 {
  margin-bottom: 1.5rem;
  position: relative;
}

.footer-column h3::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  width: 50px;
  height: 2px;
  background-color: var(--primary-light);
}

.footer-column ul {
  list-style: none;
}

.footer-column li {
  margin-bottom: 0.8rem;
}

.footer-column a {
  color: var(--text-light);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: var(--primary-light);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary);
  color: var(--text-light);
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: var(--primary-light);
}


.btn {
  background-color: var(--primary);
  color: var(--text-light);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn:hover {
  background-color: var(--primary-dark);
}

.btn-small {
  background-color: var(--primary);
  color: var(--text-light);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-small:hover {
  background-color: var(--primary-dark);
}

section {
  padding: 3rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  text-align: center;
  color: var(--text);
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav ul {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
