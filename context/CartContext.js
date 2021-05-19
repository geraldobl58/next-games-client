import { createContext } from 'react'

const CartContext = createContext({
  productCart: 0,
  addProductCart: () => null,
  getProductCart: () => null,
  removeProductCart: () => null,
  removeAllProductCart: () => null
})

export default CartContext