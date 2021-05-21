import { toast } from 'react-toastify'

import { size, includes, remove } from 'lodash'

import { BASE_URL, CART } from '../utils/constatnts'

import { authFetch } from '../utils/fetch'

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

export function countProductsCart() {
  const cart = getProductsCart();

  if (!cart) {
    return 0
  } else {
    return size(cart)
  }
}

export function removeProductCart(product) {
  const cart = getProductsCart()

  remove(cart, (item) => {
    return item === product
  })

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart)
  } else {
    localStorage.removeItem(CART)
  }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address
    delete addressShipping.users_permissions_user
    delete addressShipping.createdAt

    const url = `${BASE_URL}/orders`
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping
      })
    };

    const result = await authFetch(url, params, logout)

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}

export function removeAllProductsCart() {
  localStorage.removeItem(CART)
}