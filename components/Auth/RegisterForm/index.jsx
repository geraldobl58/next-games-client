import { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'

export default function RegisterForm({ showLoginForm }) {
  return (
    <Form className="register-form">
      <Form.Input type="text" name="firstname" placeholder="Nome" />
      <Form.Input type="text" name="lastname" placeholder="Sobrenome" />
      <Form.Input type="text" name="username" placeholder="Usuário" />
      <Form.Input type="email" name="email" placeholder="E-mail" />
      <Form.Input type="password" name="password" placeholder="Senha" />
      <div className="actions">
        <Button type="button" basic>Faça seu login</Button>
        <Button type="submit" className="submit">Cadastrar</Button>
      </div>
    </Form>
  )
}