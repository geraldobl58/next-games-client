import BasicLayout from '../layouts/BasicLayout'

export default function Wishlist() {
  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de favoritos</div>

        <div className="data">
          <p>Listagem de jogos</p>
        </div>
      </div>
    </BasicLayout>
  )
}