import { useState, useEffect } from 'react'

import { Loader } from 'semantic-ui-react'

import { size, forEach } from 'lodash'

import { getFavoriteApi } from '../api/favorite'

import useAuth from '../hooks/useAuth'

import ListGames from '../components/ListGames'
import BasicLayout from '../layouts/BasicLayout'

export default function Wishlist() {
  const [games, setGames] = useState(null)
  
  const { auth, logout } = useAuth()

  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout)
      
      if (size(response) > 0) {
        const gameList = []

        forEach(response, (data) => {
          gameList.push(data.game)
        })
        setGames(gameList)
      } else {
        setGames([])
      }
    })()
  }, [])

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de favoritos</div>

        <div className="data">
          {!games && <Loader active />}
          
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3>Não existe jogos na sua lista de favoritos.</h3>
            </div>
          )}

          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  )
}