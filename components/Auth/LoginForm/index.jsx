export default function LoginForm({ showRegisterForm }) {
  return (
    <div>
      <h1>Formulário de Login</h1>
      <button onClick={showRegisterForm}>Cadastre-se</button>
    </div>
  )
}