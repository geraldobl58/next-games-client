import { useState, useEffect } from 'react'
import { Container, Menu, Grid, Icon } from 'semantic-ui-react'
import Link from 'next/link'
import { map } from 'lodash'
import BasicModal from '../../Modal/BasicModal'
import Auth from '../../Auth'
import useAuth from '../../../hooks/useAuth'
import { getMeApi } from '../../../api/user'
import { getPlatformApi } from '../../../api/platform'

export default function Nav() {
  const [platforms, setPlatforms] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Faça seu login')
  const [user, setUser] = useState(undefined)

  const { logout, auth } = useAuth()

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout)
      setUser(response)
    })()
  }, [auth])

  useEffect(() => {
    (async () => {
      const response = await getPlatformApi()
      setPlatforms(response || [])
    })()
  }, [])

  const onShowModal = () => setShowModal(true)
  const onCloseModal = () => setShowModal(false)

  return (
    <div className="nav">
      <Container>
        <Grid>
          <Grid.Column width={6} className="nav__left">
            <NavPlatforms platforms={platforms} />
          </Grid.Column>
          <Grid.Column width={10} className="nav__right">
            {user !== undefined && (
              <MenuOptions 
                onShowModal={onShowModal}
                user={user}
                logout={logout} 
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal 
        show={showModal} 
        setShow={setShowModal} 
        title={titleModal} 
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  )
}

function NavPlatforms({ platforms }) {
  return (
    <Menu>
     {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform._id}>
          <Menu.Item as="a" name={platform.url}>{platform.title}</Menu.Item>
        </Link>
     ))}
    </Menu>
  )
}

function MenuOptions({ onShowModal, user, logout }) {
  return (
    <Menu>
      {user ? (
       <>
          <Link href='/orders'>
            <Menu.Item as="a">
              <Icon name="game" />
              Meus Pedidos
            </Menu.Item>
          </Link>
          <Link href='/wishlist'>
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Favoritos
            </Menu.Item>
          </Link>
          <Link href='/account'>
            <Menu.Item as="a">
              <Icon name="user outline" />
              Minha Conta ({user.firstname})
            </Menu.Item>
          </Link>
          <Link href='/cart'>
            <Menu.Item as="a">
              <Icon name="cart" />
              Carrinho
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout}>
            <Icon name="power off" />
            Sair
          </Menu.Item>
       </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Minha Conta
        </Menu.Item>
      )}
    </Menu>
  )
}