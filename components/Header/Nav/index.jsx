import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'

export default function Nav() {
  return (
    <div className="nav">
      <Container>
        <Grid>
          <Grid.Column width={6} className="nav__left">
            <NavPlatforms />
          </Grid.Column>
          <Grid.Column width={10} className="nav__right">
            <MenuOptions />
          </Grid.Column>
        </Grid>
      </Container>
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

function MenuOptions() {
  return (
    <Menu>
      <Menu.Item>
        <Icon name="user outline" />
        Minha Conta
      </Menu.Item>
    </Menu>
  )
}