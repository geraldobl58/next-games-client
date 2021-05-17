import { useState, useEffect } from 'react'

import { size } from 'lodash'

import BasicLayout from "../layouts/BasicLayout"

import { getLastGameApi } from '../api/game'

export default function Home() {
  const [games, setGames] = useState(null)

  console.log(games)

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
      <h1>Nextjs</h1>
    </BasicLayout>
  )
}
