import { useState, useEffect } from 'react' 
import { useRouter } from 'next/router'

import useAuth from '../hooks/useAuth'

import { getMeApi } from '../api/user'

import BasicLayout from '../layouts/BasicLayout'

export default function Account() {
  const [user, setUser] = useState(undefined)
  const { auth, logout } = useAuth()
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
      <Configuration />
    </BasicLayout>
  )
}

function Configuration() {
  return (
    <div className="account__configuration">
      <div className="title">Configuração</div> 
      <div className="data">Formulário</div> 
    </div>
  )
}