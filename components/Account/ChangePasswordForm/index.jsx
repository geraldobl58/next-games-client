import { useState } from 'react'

import { Form, Button } from 'semantic-ui-react'

import { useFormik } from 'formik'

import * as Yup from 'yup'

import { toast } from 'react-toastify'

import { updatePasswordApi } from '../../../api/user'

export default function ChangePasswordForm({ user, logout }) {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true)
      const response = await updatePasswordApi(user.id, formData.password, logout)
      if (!response) {
        toast.error('Whoops: Houve um erro ao atualizar os dados!')
      } else {
        logout()
      }
      setLoading(false)
    }
  })
  
  return (
    <div className="change-passowrd-form">
      <h4>Atualizar senha</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input 
            name="password"
            type="password"
            placeholder="Senha"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input 
            name="repeatPassword"
            type="password"
            placeholder="Repetir senha"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>Atualizar</Button>
      </Form>
    </div>
  )
}

function initialValues() {
  return {
    password: '',
    repeatPassword: ''
  }
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref('repeatPassword')], true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref('password')], true)
  }
}