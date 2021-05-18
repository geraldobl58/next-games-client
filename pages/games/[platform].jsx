import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import BasicLayout from '../../layouts/BasicLayout'

import { getGamesPlatformApi } from '../../api/game'

const limitPerPage = 1

export default function Platform() {
  const [games, setGames] = useState(null)
  const { query } = useRouter()

  useEffect(() => {
    (async () => {
      const response = await getGamesPlatformApi(query.platform, limitPerPage, 0)
      setGames(response)
    })()
  }, [query])

  return (
    <BasicLayout className="platform">
      <h1>{query.platform}</h1>
    </BasicLayout>
  )
}