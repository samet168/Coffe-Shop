import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"

import App from "./App.vue"
import HomePage from "./pages/HomePage.vue"
import MenuPage from "./pages/ManuPage.vue"
import BlogPage from "./pages/BlogPage.vue"
import MediaPage from "./pages/MediaPage.vue"
import ContactPage from "./pages/ContactPage.vue"
import ProductPage from "./pages/ProductPage.vue"
import CheckoutPage from "./pages/checkoutPage.vue"
import AboutPage from "./pages/AboutPage.vue"

const routes = [
  { path: "/", component: HomePage },
  { path: "/menu", component: MenuPage },
  { path: "/blog", component: BlogPage },
  { path: "/media", component: MediaPage },
  { path: "/contact", component: ContactPage },
  { path: "/about", component: AboutPage },
  { path: "/product/:id", component: ProductPage, props: true },
  { path: "/checkout", component: CheckoutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

const app = createApp(App)
app.use(router)
app.mount("#app")
