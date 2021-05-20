import { useState, useEffect } from 'react'

import BasicLayout from '../layouts/BasicLayout'

import { getGameByUrlApi } from '../api/game'

import useCart from '../hooks/useCart'

export default function Cart() {
  const { getProductCart } = useCart()

  const products = getProductCart()

  return !products ? <EmptyCart /> : <FullCart products={products} />
}

function EmptyCart() {
  return (
    <BasicLayout className="empty-cart">
      <h2>Não existe produtos no carrinho.</h2>
    </BasicLayout>
  )
}

function FullCart({ products }) {
  const [productsData, setProductsData] = useState(null)

  useEffect(() => {
    (async () => {
      const productsTemp = []

      for await (const product of products) {
        const data = await getGameByUrlApi(product)
        productsTemp.push(data)
      }
      setProductsData(productsTemp)
    })()
  }, [])

  return (
    <BasicLayout className="empty-cart">
      <h2>Carrinho</h2>
    </BasicLayout>
  )
}