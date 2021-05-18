import { Image, Grid } from 'semantic-ui-react'

import Link from 'next/link'

import { map } from 'lodash'

export default function ListGames({ games }) {
  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={5}>
          {map(games, (game) => (
            <Game key={game._id} game={game} />
          ))}
        </Grid.Row>
      </Grid>
     
    </div>
  )
} 

function Game({ game }) {
  const formatNumberPrice = () => {
    return new Intl.NumberFormat('pt-BR', 
      { style: 'currency', currency: 'BRL' }
    ).format(game.price);
  }

  const formatNumberPriceDiscount = () => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL'
    }).format(game.price - Math.floor(game.price * game.discount) / 100)
  }

  return (
    <Grid.Column className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={game.poster.url} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ): (
                <span />
              )}
              <span className="price">
                <span className="price__discount">{formatNumberPrice()}</span>
                <span>{formatNumberPriceDiscount()}</span>
              </span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  )
}