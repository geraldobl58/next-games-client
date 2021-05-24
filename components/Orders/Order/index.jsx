import { useState } from 'react'

import { Image, Icon } from 'semantic-ui-react'

import Link from 'next/link'

import moment from 'moment'

import 'moment/locale/pt-br'

import BasicModal from '../../Modal/BasicModal'

export default function Order({ order }) {
  const [showModal, setShowModal] = useState(false)
  const { 
    game: { title, poster, url }, 
    totalPayment, 
    createdAt, 
    addressShipping 
} = order

  return (
    <>
      <div className="order">
          <div className="order__info">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster.url} alt={title} />
              </a>
            </Link>
            <div className="order__info-data-summary">
              <h2>{title}</h2>
              <p>{totalPayment}</p>
            </div>
            <div className="order__other">
              <p className="order__other-date">
                {moment(createdAt).format('L')} - 
                {moment(createdAt).format('LT')}
              </p>
              <Icon name="eye" circular link onClick={() => setShowModal(true)} />
            </div>
          </div>
      </div>
      <AddressModal 
        showModal={showModal} 
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title} 
      />
    </>
  )
}

function AddressModal({
  showModal,
  setShowModal,
  addressShipping,
  title
}) {
  return (
    <BasicModal 
      show={showModal} 
      setShow={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>Dados para entrega</h3>
      <div>
        <p>{addressShipping.name}</p>
        <p>{addressShipping.address}</p>
        <p>
          {addressShipping.state}, 
          {addressShipping.city},
          {addressShipping.postalcode}
        </p>
        <p>{addressShipping.phone}</p>
      </div>
    </BasicModal>
  )
}