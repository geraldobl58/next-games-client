import { useState } from 'react'
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'
import BasicModal from '../../Modal/BasicModal'
import Auth from '../../Auth'

export default function Nav() {
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('Faça seu login')

  const onShowModal = () => setShowModal(true)
  const onCloseModal = () => setShowModal(false)

  return (
    <div className="nav">
      <Container>
        <Grid>
          <Grid.Column width={6} className="nav__left">
            <NavPlatforms />
          </Grid.Column>
          <Grid.Column width={10} className="nav__right">
            <MenuOptions onShowModal={onShowModal} />
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

function NavPlatforms() {
  return (
    <Menu>
      <Link href="/playstation">
        <Menu.Item as="a">Playstation</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item as="a">Xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item as="a">Switch</Menu.Item>
      </Link>
    </Menu>
  )
}

function MenuOptions({ onShowModal }) {
  return (
    <Menu>
      <Menu.Item onClick={onShowModal}>
        <Icon name="user outline" />
        Minha Conta
      </Menu.Item>
    </Menu>
  )
}