import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { STRIPE_TOKEN } from '../../utils/constatnts'
import FormPayment from './FormPayment'

const stripePromise = loadStripe(STRIPE_TOKEN)

export default function Payment({ products, addresssFullCart }) {
  return (
    <div className="payment">
      <div className="title">Pagamento</div>
      <div className="data">
        <Elements stripe={stripePromise}>
          <FormPayment products={products} addresssFullCart={addresssFullCart} />
        </Elements>
      </div>
    </div>
  )
}