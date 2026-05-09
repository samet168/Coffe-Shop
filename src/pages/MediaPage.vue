<template>
  <div class="media-page">
    <div class="page-header">
      <h1>Media Gallery</h1>
      <p>Explore our coffee creations and cafe atmosphere</p>
    </div>

    <div class="media-filters">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        @click="activeFilter = filter.id"
        :class="{ active: activeFilter === filter.id }"
      >
        {{ filter.name }}
      </button>
    </div>

    <div class="media-container">
      <div 
        v-for="(item, index) in filteredMedia" 
        :key="index" 
        class="media-item"
        @click="openLightbox(item)"
      >
        <div class="media-image" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="media-overlay">
            <div class="media-type">
              <svg v-if="item.type === 'image'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <circle cx="9" cy="9" r="2"></circle>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
              </svg>
              <svg v-else-if="item.type === 'video'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
        <div class="media-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div class="lightbox" v-if="lightbox.open" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">×</button>
        <img v-if="lightbox.item.type === 'image'" :src="lightbox.item.image" :alt="lightbox.item.title">
        <div v-else-if="lightbox.item.type === 'video'" class="video-container">
          <iframe :src="lightbox.item.videoUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="lightbox-caption">
          <h3>{{ lightbox.item.title }}</h3>
          <p>{{ lightbox.item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeFilter = ref('all');
const lightbox = ref({
  open: false,
  item: {}
});

const filters = [
  { id: 'all', name: 'All' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'cafe', name: 'Cafe' },
  { id: 'events', name: 'Events' },
  { id: 'videos', name: 'Videos' }
];

const mediaItems = ref([
  {
    type: 'image',
    category: 'coffee',
    title: 'Latte Art',
    description: 'Beautiful latte art created by our skilled baristas',
    image: '/src/assets/imgMedia/p1.avif'
  },
  {
    type: 'image',
    category: 'coffee',
    title: 'Espresso Shot',
    description: 'The perfect espresso shot with golden crema',
    image: '/src/assets/imgMedia/p2.jpg'
  },
  {
    type: 'image',
    category: 'cafe',
    title: 'Cozy Corner',
    description: 'A cozy reading corner in our cafe',
    image: '/src/assets/imgMedia/p3.avif'
  },
  {
    type: 'image',
    category: 'cafe',
    title: 'Barista Station',
    description: 'Our professional coffee brewing station',
    image: '/src/assets/imgMedia/p4.avif'
  },
  {
    type: 'image',
    category: 'events',
    title: 'Coffee Tasting Event',
    description: 'Guests enjoying our monthly coffee tasting event',
    image: '/src/assets/imgMedia/p5.jpg'
  },
  {
    type: 'image',
    category: 'coffee',
    title: 'Coffee Beans',
    description: 'Premium coffee beans from around the world',
    image: '/src/assets/imgMedia/p6.avif'
  },
  {
    type: 'video',
    category: 'events',
    title: 'Barista Championship',
    description: 'Highlights from the regional barista championship',
    image: '/src/assets/imgMedia/p7.avif',
    videoUrl: 'https://www.youtube.com/watch?v=KLpT7IwgWJM'
  },
  {
    type: 'video',
    category: 'coffee',
    title: 'Brewing Guide',
    description: 'How to brew the perfect pour-over coffee',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwYnJld2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
]);

const filteredMedia = computed(() => {
  if (activeFilter.value === 'all') {
    return mediaItems.value;
  } else if (activeFilter.value === 'videos') {
    return mediaItems.value.filter(item => item.type === 'video');
  } else {
    return mediaItems.value.filter(item => item.category === activeFilter.value);
  }
});

const openLightbox = (item) => {
  lightbox.value = {
    open: true,
    item: item
  };
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.value.open = false;
  document.body.style.overflow = '';
};
</script>

<style scoped>
.media-page {
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

.media-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.media-filters button {
  background: none;
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.media-filters button.active,
.media-filters button:hover {
  background-color: var(--primary);
  color: white;
}

.media-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.media-item {
  background-color: var(--background-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;
}

.media-item:hover {
  transform: translateY(-5px);
}

.media-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;
}

.media-item:hover .media-overlay {
  opacity: 1;
}

.media-type {
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark);
}

.media-info {
  padding: 1rem;
}

.media-info h3 {
  margin-bottom: 0.5rem;
  color: var(--accent);
}

.media-info p {
  color: var(--text);
  font-size: 0.9rem;
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  max-width: 90%;
  max-height: 90%;
  position: relative;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
}

.lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 70vh;
  display: block;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.lightbox-caption {
  padding: 1rem;
  background-color: white;
}

.lightbox-caption h3 {
  margin-bottom: 0.5rem;
  color: var(--accent);
}

.lightbox-caption p {
  color: var(--text);
}

@media (max-width: 768px) {
  .media-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .media-filters {
    flex-direction: column;
    align-items: center;
  }
  
  .media-filters button {
    width: 100%;
    max-width: 200px;
  }
}
</style>