import { useState, useEffect } from 'react'

import { Grid, Image, Icon, Button } from 'semantic-ui-react'

import { size } from 'lodash'

export default function HeaderGame({ game }) {
  const { poster, title } = game

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <p>Info</p>
      </Grid.Column>
    </Grid>
  )
}