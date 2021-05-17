import { useState, useEffect } from 'react' 
import { useRouter } from 'next/router'

import useAuth from '../hooks/useAuth'

import { getMeApi } from '../api/user'

import BasicLayout from '../layouts/BasicLayout'
import ChangeNameForm from '../components/Account/ChangeNameForm'
import ChangeEmailForm from '../components/Account/ChangeEmailForm'
import ChangePasswordForm from '../components/Account/ChangePasswordForm'

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