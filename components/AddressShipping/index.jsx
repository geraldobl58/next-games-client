import { useState, useEffect } from 'react'

import { Grid } from 'semantic-ui-react'

import { map, size } from 'lodash'

import Link from 'next/link'

import classNames from 'classnames'

import { getAddressApi } from '../../api/address'

import useAuth from '../../hooks/useAuth'

export default function AddressShipping({ setAddresssFullCart }) {
  const [address, setAddress] = useState(null)
  const [addressActive, setAddressActive] = useState(null)

  const { auth, logout } = useAuth()

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout)
      setAddress(response || [])
    })()
  }, [])

  return (
    <div className="address-shipping">
      <div className="title">Endereço para entrega</div>
      <div className="data">
        {size(address) === 0 ? (
          <>
            <h3>Não existe endereços criados no momento!</h3>
            <Link href="/account">
              <a>Crie sua conta é simples.</a>
            </Link>
          </>
        ) : (
          <Grid>
            {map(address, (address) => (
              <Grid.Column
                key={address.id}
                mobile={16}
                tablet={8}
                computer={4}
              >
                <Address 
                  address={address} 
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddresssFullCart={setAddresssFullCart}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  )
}

function Address({ address, addressActive, setAddressActive, setAddresssFullCart, }) {
  const changeAddress = () => {
    setAddressActive(address._id)
    setAddresssFullCart(address)
  }

  return (
    <div
      className={classNames('address', {
        active: addressActive === address._id
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state}, {address.postalcode}
      </p>
      <p>{address.phone}</p>
    </div>
  )
}