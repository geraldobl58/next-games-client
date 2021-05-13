export default function RegisterForm({ showLoginForm }) {
  return (
    <div>
      <h1>Formulário de cadastro</h1>
      <button onClick={showLoginForm}>Faça seu login</button>
    </div>
  )
}