import { useState, useEffect } from 'react' 
import { useRouter } from 'next/router'

import { Icon } from 'semantic-ui-react'

import useAuth from '../hooks/useAuth'

import { getMeApi } from '../api/user'

import BasicLayout from '../layouts/BasicLayout'
import ChangeNameForm from '../components/Account/ChangeNameForm'
import ChangeEmailForm from '../components/Account/ChangeEmailForm'
import ChangePasswordForm from '../components/Account/ChangePasswordForm'
import BasicModal from '../components/Modal/BasicModal'
import AddressForm from '../components/Account/AddressForm'
import ListAddress from '../components/Account/ListAddress'

export default function Account() {
  const [user, setUser] = useState(undefined)
  const { auth, logout, setReloadUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout)
      setUser(response || null)
    })()
  }, [auth])

  if (user === undefined) return null

  if (!auth && !user) {
    router.replace('/')
    return null
  }

  return (
    <BasicLayout className="account">
      <Configuration 
        user={user} 
        logout={logout} 
        setReloadUser={setReloadUser} 
      />
      <Address 

      />
    </BasicLayout>
  )
}

function Configuration({ user, logout, setReloadUser }) {
  return (
    <div className="account__configuration">
      <div className="title">Configuração</div> 
        <div className="data">
          <ChangeNameForm 
            user={user} 
            logout={logout} 
            setReloadUser={setReloadUser} 
          />
          <ChangeEmailForm 
            user={user} 
            logout={logout} 
            setReloadUser={setReloadUser} 
          />
          <ChangePasswordForm 
            user={user} 
            logout={logout} 
          />
        </div> 
    </div>
  )
}

function Address() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [formModal, setFormModal] = useState(null)
  const [reloadAddress, setReloadAddress] = useState(false)

  const openModal = (title, address) => {
    setTitleModal(title)
    setFormModal(
      <AddressForm 
        setShowModal={setShowModal} 
        setReloadAddress={setReloadAddress}
        newAddress={address ? false : true}
        address={address || null} 
      />
    )
    setShowModal(true)
  }

  return (
    <div className="account__address">
      <div className="title">
        Endereços
        <Icon name="plus" link onClick={() => openModal('Novo endereço')} />
      </div>
      <div className="data">
        <ListAddress 
          reloadAddress={reloadAddress}
          setReloadAddress={setReloadAddress} 
          openModal={openModal}
        />
      </div>
      <BasicModal 
        show={showModal} 
        setShow={setShowModal} 
        title={titleModal}
      >
        {formModal}
      </BasicModal>
    </div>
  )
}