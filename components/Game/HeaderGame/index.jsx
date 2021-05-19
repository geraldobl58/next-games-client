import { useState, useEffect } from 'react'

import { Grid, Image, Icon, Button } from 'semantic-ui-react'

import classNames from 'classnames'

import { size } from 'lodash'

import useAuth from '../../../hooks/useAuth'

import { isFavoriteApi, addFavoriteApi } from '../../../api/favorite'

export default function HeaderGame({ game }) {
  const { poster, title } = game

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={poster.url} alt={title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  )
}

function Info({ game: { id, title, summary, price, discount } }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [reloadFavorite, setReloadFavorite] = useState(false)
  
  const { auth, logout } = useAuth()

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, id, logout) 
      
      if (size(response) > 0) {
        setIsFavorite(true)
      } else {
        setIsFavorite(false)
      }
    })()
    setReloadFavorite(false)
  }, [reloadFavorite])

  const addFavorite = async () => {
    if (auth) {
      await addFavoriteApi(auth.idUser, id, logout)
      setReloadFavorite(true)
    }
  }

  const deleteFavorite = () => {
    console.log('Remove')
  }

  const formatNumberPrice = () => {
    return new Intl.NumberFormat('pt-BR', 
      { style: 'currency', currency: 'BRL' }
    ).format(price);
  }

  const formatNumberPriceDiscount = () => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency', currency: 'BRL'
    }).format(price - Math.floor(price * discount) / 100)
  }

  return (
    <>  
      <div className="header-game__title">
      {title}
        <Icon name={isFavorite ? 'heart' : 'heart outline'} 
          className={classNames({
            like: isFavorite
          })} link 
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div 
        className="header-game__summary" 
        dangerouslySetInnerHTML={{ __html: summary }}  
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p><strong>Preço:</strong> {formatNumberPrice()}</p>
          <div className="header-game__buy-price-actions">
            <p><strong>Desconto:</strong> -{discount}%</p>
            <p><strong>Preço com desconto:</strong> {formatNumberPriceDiscount()}</p>
          </div>
        </div>
        <Button className="header-game__buy-btn">Comprar</Button>
      </div>
    </>
  )
}