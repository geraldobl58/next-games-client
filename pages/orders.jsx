import { useState, useEffect } from 'react'

import { Grid } from 'semantic-ui-react'

import { map, size } from 'lodash'

import BasicLayout from '../layouts/BasicLayout'
import Order from '../components/Orders/Order'

import { getOrderApi } from '../api/order'

import useAuth from '../hooks/useAuth'

export default function Orders() {
  const [orders, setOrders] = useState(null)

  const { auth, logout } = useAuth()

  useEffect(() => {
    (async () => {
      const response = await getOrderApi(auth.idUser, logout)
      setOrders(response || [])
    })()
  }, [])

  return (
    <BasicLayout className="orders">
      <div className="orders__block">
          <div className="title">Meus Pedidos</div>
            <div className="data">
              {size(orders) === 0 ? (
                <h2>Não existe pedidos no momento.</h2>
              ) : (
                <OrderList orders={orders} />
              )}
          </div>
      </div>
    </BasicLayout>
  )
}

function OrderList({ orders }) {
  return (
    <Grid>
      {map(orders, (order, index) => (
        <Grid.Column mobile={16} tablet={6} computer={8} key={index}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  )
}
