import { useState, useEffect } from 'react'

import { Form, Button, Grid } from 'semantic-ui-react'

import { map, size } from 'lodash'

import { getAddressApi, deleteAddressApi } from '../../../api/address'

import useAuth from '../../../hooks/useAuth'

export default function ListAddress({ reloadAddress, setReloadAddress, openModal }) {
  const [address, setAddress] = useState(null)

  const { auth, logout } = useAuth()

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout)
      setAddress(response || [])
      setReloadAddress(false)
    })()
  }, [reloadAddress])

  if (!address) return null

  return (
    <div className="list-address">
      {size(address) === 0 ? (
        <h3>Não existe registro no momento!</h3>
      ): (
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
                logout={logout}
                setReloadAddress={setReloadAddress}
                openModal={openModal} 
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  )
}

function Address({ address, logout, setReloadAddress, openModal }) {
  const [loadingDelete, setLoadingDelete] = useState(false)

  const deleteAddress = async () => {
    setLoadingDelete(true)
    const response = await deleteAddressApi(address._id, logout)

    if (response) {
      setReloadAddress(true)
    }
    setLoadingDelete(false)
  }

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalcode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          onClick={() => openModal(`Editando Registro: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button 
          onClick={deleteAddress} 
          loading={loadingDelete}>
            Excluir
        </Button>
      </div>
    </div>
  )
}