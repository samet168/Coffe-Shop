<template>
  <div class="about-page">
    <!-- Hero Section with Modern Design -->
    <section class="modern-about-hero">
      <div class="hero-background">
        <div class="geometric-lines">
          <svg class="line-1" viewBox="0 0 200 200" fill="none">
            <path d="M50 150 Q100 50 150 150" stroke="rgba(212, 160, 118, 0.3)" stroke-width="2"/>
          </svg>
          <svg class="line-2" viewBox="0 0 200 200" fill="none">
            <path d="M20 100 Q100 20 180 100" stroke="rgba(139, 90, 43, 0.2)" stroke-width="1"/>
          </svg>
        </div>
      </div>
      
      <div class="container">
        <div class="hero-content-grid">
          <div class="about-content">
            <div class="about-badge">
              <span>About </span>
            </div>
            
            <div class="about-text">
                    <p>My name is Moeun Samet.</p>
                    <p>I am a web development designer based at ETTEC with experience through projects and courses in the center.</p>
                    <p>Currently studying at the Royal University of Phnom Penh as a 2nd year student.</p>
                    <p>My goal: Challenge myself in a new environment to learn, develop, improve my skills through various projects and contribute more to the company with my abilities.</p>
            </div>

            <div class="contact-section">
              <h3>Contact</h3>
              <div class="contact-grid">
                <div class="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>sametmoeun99@gmail.com</span>
                </div>
                <div class="contact-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>(+855) 883746083</span>
                </div>

              </div>
            </div>
          </div>

          <div class="profile-section">
            <div class="profile-image-container">
              <div class="profile-image">
                <img src="/src/assets/imgProfile/profile.jpg" alt="Coffee Shop Owner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="skills-section">
      <div class="container">
        <div class="skills-grid">
        
          <div class="skill-card">
            <div class="card-header">
              <h3>Experience</h3>
              <span class="badge">N/A</span>
            </div>
            <div class="card-content">
              <h3>N/A</h3>
            </div>
          </div>

        
          <div class="skill-card">
            <div class="card-header">
              <h3>skill</h3>
            </div>
            <div class="card-content">
              <div class="skills-list">
                <span class="skill-item">C</span>
                <span class="skill-item">C++/OOP</span>
                <span class="skill-item">HIML</span>
                <span class="skill-item">Css/Boostrap</span>
                <span class="skill-item">JS/Jqury</span>
                <span class="skill-item">VUE.JS</span>
                <span class="skill-item">React.JS</span>
                <span class="skill-item">Python-flask</span>
                <span class="skill-item">Java</span>
              </div>
            </div>
          </div>

      
    
        

         
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #2d2013 0%, #4a2c17 50%, #6b4423 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.modern-about-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.geometric-lines {
  position: absolute;
  width: 100%;
  height: 100%;
}

.line-1 {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 300px;
  height: 300px;
  opacity: 0.6;
}

.line-2 {
  position: absolute;
  bottom: 20%;
  left: 5%;
  width: 250px;
  height: 250px;
  opacity: 0.4;
}

.hero-content-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.about-content {
  color: white;
}

.about-badge {
  display: inline-block;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(139, 90, 43, 0.3);
}

.about-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff, var(--background-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.contact-section {
  margin-top: 3rem;
}

.contact-section h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.contact-item svg {
  color: var(--primary-light);
  flex-shrink: 0;
}

/* Profile Section */
.profile-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image-container {
  position: relative;
}

.profile-image {
  width: 350px;
  height: 450px;
  border-radius: 2rem;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-light), var(--background-light));
  padding: 1rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  position: relative;
}

.profile-image::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light), var(--background-light));
  border-radius: 2rem;
  z-index: -1;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
}

/* Skills Section */
.skills-section {
  padding: 4rem 0;
  position: relative;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, var(--background-light) 100%);
  border-radius: 3rem 3rem 0 0;
  margin-top: -3rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s, box-shadow 0.3s;
}

.skill-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent);
  font-style: italic;
}

.badge {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.card-content {
  color: var(--text);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-item {
  background: var(--background-light);
  color: var(--text);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
}

.skill-item:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

</style>
