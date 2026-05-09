import { reactive, computed } from 'vue'


const state = reactive({
  items: [],
  isOpen: false
})

export const useCart = () => {

  const addToCart = (product, quantity) => {
    const existingItem = state.items.find(item => item.id === product.id)
    
    if (existingItem) {

      existingItem.quantity += quantity
    } else {

      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      })
    }
    

    state.isOpen = true
   
    setTimeout(() => {
      state.isOpen = false
    }, 3000)
  }

  const removeFromCart = (productId) => {
    const index = state.items.findIndex(item => item.id === productId)
    if (index !== -1) {
      state.items.splice(index, 1)
    }
  }

  const updateQuantity = (productId, quantity) => {
    const item = state.items.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
    
      if (quantity <= 0) {
        removeFromCart(productId)
      }
    }
  }

  const clearCart = () => {
    state.items = []
  }
  

  const toggleCart = () => {
    state.isOpen = !state.isOpen
  }
  
 
  const cartItemCount = computed(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  })
  

  const cartSubtotal = computed(() => {
    return state.items.reduce((total, item) => {
   
      const priceValue = parseInt(item.price.replace(/\D/g, ''))
      return total + (priceValue * item.quantity)
    }, 0)
  })
  
  return {
    items: computed(() => state.items),
    isOpen: computed(() => state.isOpen),
    cartItemCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  }
}
