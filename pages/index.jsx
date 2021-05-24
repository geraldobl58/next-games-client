import { useState, useEffect } from 'react'

import { Loader } from 'semantic-ui-react'

import { size } from 'lodash'

import BasicLayout from "../layouts/BasicLayout"

import { getLastGameApi } from '../api/game'
import ListGames from '../components/ListGames'

import Seo from '../components/Seo'

export default function Home() {
  const [games, setGames] = useState(null)

  useEffect(() => {
    (async () => {
      const response = await getLastGameApi(50)

      if (size(response) > 0) {
        setGames(response)
      } else {
        setGames([])
      }
    })()
  }, [])

  return (
    <BasicLayout className="homepage">
      <Seo 
        title='Next Games'
        description='Este e-commerce é somente um exemplo de estudos, nenhuma compra realizada será atendida.' 
      />
      {!games && <Loader active />}
      {games && size(games) === 0 && (
        <div>
          <h3>Whoops: Não existe jogos no momento!</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  )
}
