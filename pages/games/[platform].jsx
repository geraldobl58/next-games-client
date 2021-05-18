import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Loader } from 'semantic-ui-react'

import { size } from 'lodash'

import BasicLayout from '../../layouts/BasicLayout'
import ListGames from '../../components/ListGames'

import { getGamesPlatformApi } from '../../api/game'

const limitPerPage = 2

export default function Platform() {
  const [games, setGames] = useState(null)
  const { query } = useRouter()

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await getGamesPlatformApi(query.platform, limitPerPage, 0)
        setGames(response)
      }
    })()
  }, [query])

  return (
    <BasicLayout className="platform">
      {!games && <Loader active />}
      {games && size(games) === 0 && (
        <div>
          <h3>Não existe jogos no momento!</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  )
}