import { useState, useEffect } from 'react'

import { Table, Image, Icon } from 'semantic-ui-react'

import { forEach, map } from 'lodash'

import useCart from '../../../hooks/useCart'

export default function SummaryCart({ products, setReloadCart, reloadCart }) {
  const [totalPrice, setTotalPrice] = useState(0)

  const { removeProductCart } = useCart()

  useEffect(() => {
    let price = 0
    forEach(products, (product) => {
      price += product.price - Math.floor(product.price * product.discount) / 100
    })
    setTotalPrice(price)
  }, [reloadCart, products])

  const removeProduct = (product) => {
    removeProductCart(product)
    setReloadCart(true)
  }

  const formatNumerTotalPrice = () => {
    return new Intl.NumberFormat('pt-BR', 
      { style: 'currency', currency: 'BRL' }
    ).format(totalPrice.toFixed(2));
  }

  return (
    <div className="summary-cart">
      <div className="title">Resumo do carrinho</div>

      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Produto</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Desconto</Table.HeaderCell>
              <Table.HeaderCell>Preço</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => {

              const formatNumberPrice = () => {
                return new Intl.NumberFormat('pt-BR', 
                  { style: 'currency', currency: 'BRL' }
                ).format(product.price);
              }

              const formatNumberPriceDiscount = () => {
                return new Intl.NumberFormat('pt-BR', {
                  style: 'currency', currency: 'BRL'
                }).format(product.price - Math.floor(product.price * product.discount) / 100)
              }

              return (
                <Table.Row key={product.id} className="summary-cart__product">
                  <Table.Cell>
                    <Icon 
                      name="close" 
                      link 
                      onClick={() => removeProduct(product.url)} 
                    />
                    <Image src={product.poster.url} alt={product.title} />
                    {product.title}
                  </Table.Cell>
                  <Table.Cell>{product.platform.title}</Table.Cell>
                  <Table.Cell>Normal</Table.Cell>
                  <Table.Cell>-{product.discount}%</Table.Cell>
                  <Table.Cell>
                    <span>{formatNumberPrice()}</span> {formatNumberPriceDiscount()}
                  </Table.Cell>
                </Table.Row>
              )
            })}
            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear" />
              <Table.Cell className="clear" />
              <Table.Cell colSpan="2">Total</Table.Cell>
              <Table.Cell className="total-price">
                {formatNumerTotalPrice()}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}