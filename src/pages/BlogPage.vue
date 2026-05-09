<template>
  <div class="blog-page">
    <div class="page-header">
      <h1> Blog</h1>
      <p>Read about coffee culture, brewing techniques, and</p>
    </div>

    <div class="blog-container">
      <div class="blog-posts">
        <article class="blog-post" v-for="(post, index) in blogPosts" :key="index">
          <div class="blog-image" :style="{ backgroundImage: `url(${post.image})` }"></div>
          <div class="blog-content">
            <div class="blog-meta">
              <span class="blog-category">{{ post.category }}</span>
              <span class="blog-date">{{ post.date }}</span>
            </div>
            <h2>{{ post.title }}</h2>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a href="#" class="blog-link">Read More</a>
          </div>
        </article>
      </div>

      <aside class="blog-sidebar">
        <div class="sidebar-section">
          <h3>Categories</h3>
          <ul class="category-list">
            <li v-for="(category, index) in categories" :key="index">
              <a href="#">{{ category.name }} <span>({{ category.count }})</span></a>
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h3>Recent Posts</h3>
          <ul class="recent-posts">
            <li v-for="(post, index) in recentPosts" :key="index">
              <a href="#">{{ post.title }}</a>
              <span class="post-date">{{ post.date }}</span>
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h3>Subscribe</h3>
          <p>Stay updated with our latest posts and coffee tips</p>
          <form class="subscribe-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit" class="btn-small">Subscribe</button>
          </form>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const blogPosts = ref([
  {
    title: 'The Art of Coffee Brewing',
    excerpt: 'Discover the secrets to brewing the perfect cup of coffee at home with these expert tips and techniques.',
    image: '/src/assets/imgBlog/p1.jpg',
    category: 'Brewing',
    date: 'June 15, 2023'
  },
  {
    title: 'Coffee Bean Origins: A Journey Around the World',
    excerpt: 'Take a virtual tour of the world\'s most renowned coffee-growing regions and learn what makes each origin unique.',
    image: 'src/assets/imgBlog/p2.jpg',
    category: 'Coffee Beans',
    date: 'June 8, 2023'
  },
  {
    title: 'The Perfect Milk Froth for Your Coffee',
    excerpt: 'Learn how to create silky, velvety milk foam for your cappuccinos and lattes like a professional barista.',
    image: 'src/assets/imgBlog/p3.jpg',
    category: 'Barista Tips',
    date: 'May 30, 2023'
  },
  {
    title: 'Coffee and Health: Separating Fact from Fiction',
    excerpt: 'Explore the latest research on coffee\'s health benefits and debunk common myths about caffeine consumption.',
    image: 'src/assets/imgBlog/p4.jpg ',
    category: 'Health',
    date: 'May 22, 2023'
  }
]);

const categories = ref([
  { name: 'Brewing', count: 12 },
  { name: 'Coffee Beans', count: 8 },
  { name: 'Barista Tips', count: 15 },
  { name: 'Health', count: 6 },
  { name: 'Recipes', count: 10 }
]);

const recentPosts = ref([
  { title: 'How to Clean Your Coffee Machine', date: 'June 12, 2023' },
  { title: 'Summer Coffee Recipes to Try', date: 'June 5, 2023' },
  { title: 'The Rise of Specialty Coffee Shops', date: 'May 28, 2023' },
  { title: 'Coffee Tasting: Developing Your Palate', date: 'May 20, 2023' }
]);
</script>

<style scoped>
.blog-page {
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

.blog-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-post {
  background-color: var(--background-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.blog-image {
  height: 250px;
  background-size: cover;
  background-position: center;
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.blog-category {
  background-color: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.blog-date {
  color: #777;
}

.blog-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent);
}

.blog-excerpt {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--text);
}

.blog-link {
  display: inline-block;
  color: var(--primary-dark);
  font-weight: 500;
  text-decoration: none;
  position: relative;
}

.blog-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-dark);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.blog-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  background-color: var(--background-light);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar-section h3 {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary);
  color: var(--accent);
}

.category-list, .recent-posts {
  list-style: none;
}

.category-list li, .recent-posts li {
  margin-bottom: 0.75rem;
}

.category-list a, .recent-posts a {
  text-decoration: none;
  color: var(--text);
  transition: color 0.3s;
}

.category-list a:hover, .recent-posts a:hover {
  color: var(--primary-dark);
}

.category-list span {
  color: #777;
}

.post-date {
  display: block;
  font-size: 0.8rem;
  color: #777;
  margin-top: 0.25rem;
}

.subscribe-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.subscribe-form input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

@media (max-width: 768px) {
  .blog-container {
    grid-template-columns: 1fr;
  }
  
  .blog-image {
    height: 200px;
  }
}
</style>