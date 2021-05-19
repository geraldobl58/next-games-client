import { BASE_URL } from '../utils/constatnts'
import { authFetch } from '../utils/fetch'

import { size } from 'lodash'

export async function isFavoriteApi(idUser, idGame, logout) {
  try {
    const url = `${BASE_URL}/favorites?users_permissions_user=${idUser}&game=${idGame}`
    return await authFetch(url, null, logout)
  }catch(err) {
    console.log(err)
    return null
  }
}


export async function addFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout)

    if (size(dataFound) > 0 || !dataFound) {
      return 'Whoops: Não existe jogos em seus favoritos.'
    } else {
      const url = `${BASE_URL}/favorites`
      const params = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users_permissions_user: idUser, game: idGame })
      };

      const result = await authFetch(url, params, logout)

      return result
    }
  }catch(err) {
    console.log(err)
    return null
  }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
  try {
    const dataFound = await isFavoriteApi(idUser, idGame, logout)

    if (size(dataFound) > 0) {
      const url = `${BASE_URL}/favorites/${dataFound[0]?._id}`
      const params = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
      };

      const result = authFetch(url, params, logout)
      
      return result
    }

  }catch(err) {
    console.log(err)
    return null
  }
}