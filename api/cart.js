import { toast } from 'react-toastify'

import { size, includes, remove } from 'lodash'

import { BASE_URL, CART } from '../utils/constatnts'

export function getProductsCart() {
  const cart = localStorage.getItem(CART)

  if (!cart) {
    return null
  } else {
    const products = cart.split(',')

    return products
  }
}

export function addProductCart(product) {
  const cart = getProductsCart()

  if (!cart) {
    localStorage.setItem(CART, product)
    toast.success('Produto adicionado com sucesso')
  } else {
    const productFound = includes(cart, product)

    if (productFound) {
      toast.warning('Produto já está no carrinho')
    } else {
      cart.push(product)
      localStorage.setItem(CART, cart)
      toast.success('Produto adicionado corretamente')
    } 
  }
}