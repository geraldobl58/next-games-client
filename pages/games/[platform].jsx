import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Loader } from 'semantic-ui-react'

import { size } from 'lodash'

import BasicLayout from '../../layouts/BasicLayout'
import ListGames from '../../components/ListGames'
import Pagination from '../../components/Pagination'

import { getGamesPlatformApi, getTotalGamesPlatformApi } from '../../api/game'

const limitPerPage = 20

export default function Platform() {
  const [games, setGames] = useState(null)
  const [totalGames, setTotalGames] = useState(null)
  const { query } = useRouter()

  
  const getStartItem = () => {
    const currentPage = parseInt(query.page)
    
    if (!query.page || currentPage === 1) {
      return 0
    } else {
      return currentPage * limitPerPage - limitPerPage
    }
  }

  useEffect(() => {
    (async () => {
      if (query.platform) {
        const response = await 
          getGamesPlatformApi(query.platform, limitPerPage, getStartItem())
        setGames(response)
      }
    })()
  }, [query])

  useEffect(() => {
    (async () => {
      const response = await getTotalGamesPlatformApi(query.platform)
      setTotalGames(response)
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
      
      {totalGames 
        ? <Pagination 
            totalGames={totalGames}
            page={query.page ? parseInt(query.page) : 1}
            limitPerPage={limitPerPage} 
          /> 
        : null
      }
    </BasicLayout>
  )
}