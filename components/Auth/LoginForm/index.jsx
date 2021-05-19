import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import useAuth from '../../../hooks/useAuth'

import { loginApi, resetPasswordApi } from '../../../api/user'

export default function LoginForm({ showRegisterForm, onCloseModal }) {
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true)
      const response = await loginApi(formData)
      if (response?.jwt) {
        toast.success('Login realizado com sucesso!')
        login(response.jwt)
        onCloseModal();
      } else {
        toast.error('Whoops: Email/Senha inválido!')
      }
      setLoading(false)
    }
  })

  const resetPassword = () => {
    formik.setErrors({})
    
    const validateEmail = Yup.string().email().required()

    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true })
    } else {
      resetPasswordApi(formik.values.identifier)
    }

  }

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="E-mail"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Senha"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button
          type="button"
          basic
          onClick={showRegisterForm}
        >
          Cadastre-se
        </Button>
       <div>
          <Button
          type="submit"
          className="submit"
          loading={loading}
        >
          Entrar
        </Button>
        <Button
          type="button"
          onClick={resetPassword}
        >
          Esqueceu sua senha?
        </Button>
       </div>
      </div>
    </Form>
  )
}

function initialValues() {
  return {
    identifier: '',
    password: ''
  }
}

function validationSchema() {
  return {
    identifier: Yup.string().email(true).required('Campo obrigátorio!'),
    password: Yup.string().required('Campo obrigátorio!')
  }
}