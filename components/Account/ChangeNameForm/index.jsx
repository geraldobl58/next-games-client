import { useState } from 'react'

import { Form, Button } from 'semantic-ui-react'

import { useFormik } from 'formik'

import { toast } from 'react-toastify'

import * as Yup from 'yup'

import { updateNameApi } from '../../../api/user'

export default function ChangeNameForm({ user, logout, setReloadUser }) {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(user.firstname, user.lastname),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true)
      const response = await updateNameApi(user.id, formData, logout)
      if (!response) {
        toast.error('Whoops: Houve um erro ao atualizar os dados!')
      } else {
        setReloadUser(true)
        toast.success('Dados atualizados com sucesso!')
      }
      setLoading(false)
    }
  })

  return (
    <div className="change-name-form">
      <h4>Atualizar dados</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input 
            name="firstname" 
            placeholder="Nome"
            onChange={formik.handleChange}
            value={formik.values.firstname} 
            error={formik.errors.firstname}
          />
          <Form.Input 
            name="lastname" 
            placeholder="Sobrenome"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}  
          />
        </Form.Group>
        <Button className="submit" loading={loading}>Atualizar</Button>
      </Form>
    </div>
  )
}

function initialValues(firstname, lastname) {
  return {
    firstname: firstname || '',
    lastname: lastname || ''
  }
}

function validationSchema() {
  return {
    firstname: Yup.string().required(true),
    lastname: Yup.string().required(true),
  }
}