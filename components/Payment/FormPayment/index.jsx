import { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { size } from 'lodash'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'
import useCart from '../../../hooks/useCart'

import { paymentCartApi } from '../../../api/cart'

export default function FormPayment({ products, addresssFullCart }) {
  const [loading, setLoading] = useState(false)
  
  const stripe = useStripe() 
  const elements = useElements()

  const { auth, logout } = useAuth()
  const { removeAllProductCart } = useCart()

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)
    const result = await stripe.createToken(cardElement)

    if (result.error) {
      toast.error(result.error.message)
    } else {
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        addresssFullCart,
        logout
      )

      if (size(response) > 0) {
        toast.success('Pedido realizado com sucesso')
        removeAllProductCart()
        router.push('/orders')
      } else {
        console.log('Whoops: Houve um erro ao finalizar o pedido')
      }
    }

    setLoading(false)
  }

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button 
        type="submit" 
        loading={loading} 
        disabled={!stripe}
      >
        Pagar Agora
      </Button>
    </form>
  )
}