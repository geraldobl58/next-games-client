import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function RegisterForm({ showLoginForm }) {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      console.log(formData)
    }
  })

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input 
        type="text" 
        name="firstname" 
        placeholder="Nome"
        onChange={formik.handleChange}
        error={formik.errors.username} 
      />
      <Form.Input 
        type="text" 
        name="lastname" 
        placeholder="Sobrenome" 
        onChange={formik.handleChange} 
        error={formik.errors.lastname} 
      />
      <Form.Input 
        type="text" 
        name="username" 
        placeholder="Usuário"
        onChange={formik.handleChange}
        error={formik.errors.username}   
      />
      <Form.Input 
        type="email" 
        name="email" 
        placeholder="E-mail"
        onChange={formik.handleChange}
        error={formik.errors.email}  
      />
      <Form.Input 
        type="password" 
        name="password" 
        placeholder="Senha"
        onChange={formik.handleChange}
        error={formik.errors.password}  
      />
      <div className="actions">
        <Button type="button" basic>Faça seu login</Button>
        <Button type="submit" className="submit">Cadastrar</Button>
      </div>
    </Form>
  )
}

function initialValues() {
  return {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  }
}

function validationSchema() {
  return {
    username: Yup.string().required('Campo obrigátorio!'),
    lastname: Yup.string().required('Campo obrigátorio!'),
    username: Yup.string().required('Campo obrigátorio!'),
    email: Yup.string().email().required('Campo obrigátorio!'),
    password: Yup.string().required('Campo obrigátorio!'),
  }
}