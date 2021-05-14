import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

export default function LoginForm({ showRegisterForm }) {
  return (
    <Form className="login-form">
      <Form.Input
        name="identifier"
        type="text"
        placeholder="E-mail"
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Senha"
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