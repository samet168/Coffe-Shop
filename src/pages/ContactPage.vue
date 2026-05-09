<template>
  <div class="contact-page">
    <div class="page-header">
      <h1>Contact</h1>
      <p>We'd love to hear from you! Get in touch with our team.</p>
    </div>

    <div class="contact-container">
      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h3>Phone</h3>
          <p>+1 (555) 123-4567</p>
          <p>Mon-Fri: 8am - 8pm</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
          <h3>Email</h3>
          <p>info@blackcoffee.com</p>
          <p>support@blackcoffee.com</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3>Location</h3>
          <p>123 Coffee Street</p>
          <p>Phnom penh, CA 90210</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h3>Hours</h3>
          <p>Mon-Fri: 7am - 9pm</p>
          <p>Sat-Sun: 8am - 10pm</p>
        </div>
      </div>

      <div class="contact-form-container">
        <h2>Send us a message</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          
          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" v-model="form.subject" required>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
          
          <div v-if="formStatus" :class="['form-status', formStatus.type]">
            {{ formStatus.message }}
          </div>
        </form>
      </div>
    </div>

    <div class="map-container">
      <h2>Find Us</h2>
      <div class="map">
       
        <div class="map-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p>Interactive map would be displayed here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const formStatus = ref(null);

const submitForm = async () => {
  isSubmitting.value = true;
  

  await new Promise(resolve => setTimeout(resolve, 1500));
  

  formStatus.value = {
    type: 'success',
    message: 'Your message has been sent successfully! We will get back to you soon.'
  };
  

  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  isSubmitting.value = false;
  

  setTimeout(() => {
    formStatus.value = null;
  }, 5000);
};
</script>

<style scoped>
.contact-page {
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

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.contact-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.info-card {
  background-color: var(--background-light);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.info-icon {
  width: 50px;
  height: 50px;
  background-color: var(--primary-light);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.info-card h3 {
  margin-bottom: 0.75rem;
  color: var(--accent);
}

.info-card p {
  color: var(--text);
  margin-bottom: 0.5rem;
}

.contact-form-container {
  background-color: var(--background-light);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form-container h2 {
  margin-bottom: 1.5rem;
  color: var(--accent);
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  background-color: white;
}

.form-group textarea {
  resize: vertical;
}

.form-status {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
  text-align: center;
}

.form-status.success {
  background-color: #d4edda;
  color: #155724;
}

.form-status.error {
  background-color: #f8d7da;
  color: #721c24;
}

.map-container {
  max-width: 1200px;
  margin: 0 auto;
}

.map-container h2 {
  margin-bottom: 1.5rem;
  color: var(--accent);
  text-align: center;
}

.map {
  height: 400px;
  background-color: var(--background-light);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text);
  background-color: #f5f5f5;
}

.map-placeholder svg {
  margin-bottom: 1rem;
  color: var(--primary);
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
}
</style>