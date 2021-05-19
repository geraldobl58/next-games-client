import { useState, useEffect } from 'react'

import { Loader } from 'semantic-ui-react'

import { useRouter } from 'next/router'

import { size } from 'lodash'

import BasicLayout from '../layouts/BasicLayout'
import ListGames from '../components/ListGames'

import { searchGamesApi } from '../api/game'

export default function Search() {
  const [games, setGames] = useState(null)
  const { query } = useRouter()

  useEffect(() => {
    document.getElementById('search-game').focus()
  }, [])

  useEffect(() => {
    (async () => {
      if (size(query.query) > 0) {
        const response = await searchGamesApi(query.query)
        
        if (size(response) > 0) {
          setGames(response)
        } else [
          setGames([])
        ]
      } else {
        setGames([])
      }
    })()
  }, [query])

  return (
    <BasicLayout className="search">
      {!games && <Loader active />}

      {games && size(games) === 0 && (
        <div className="search__not-found">
          <h3>Nenhum jogo foi encontrado.</h3>
        </div>
      )}

      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  )
}