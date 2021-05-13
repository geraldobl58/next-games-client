import { useState } from 'react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Auth({ onCloseModal, setTitleModal }) {
  const [showLogin, setShowLogin] = useState(true)

  const showLoginForm = () => {
    setTitleModal('Faça seu login')
    setShowLogin(true)
  }
  const showRegisterForm = () => {
    setTitleModal('Cadastre-se')
    setShowLogin(false)
  }

  return showLogin ? ( 
    <LoginForm showRegisterForm={showRegisterForm} /> 
  ) : (
    <RegisterForm showLoginForm={showLoginForm} />
  )
}