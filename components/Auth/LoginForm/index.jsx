import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

export default function LoginForm({ showRegisterForm }) {
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData)
    }
  })

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
        >
          Entrar
        </Button>
        <Button
          type="button"
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