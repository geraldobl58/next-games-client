import { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

import BasicLayout from '../layouts/BasicLayout'

import { getGameByUrlApi } from '../api/game'

import HeaderGame from '../components/Game/HeaderGame'
import TabGame from '../components/Game/TabGame'
import Seo from '../components/Seo'

export default function Game() {
  const [game, setGame] = useState(null)
  const { query } = useRouter()

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game)
      setGame(response)
    })()
  }, [query])

  if (!game) {
    return null
  }

  return (
    <BasicLayout className="game">
      <Seo 
        title={game.title}
      />
      <HeaderGame game={game} />
     <TabGame game={game} />
    </BasicLayout>
  )
}