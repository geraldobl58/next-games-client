import { BASE_URL } from '../utils/constatnts'

export async function getLastGameApi(limit) {
  try {
    const limitItems = `_limit=${limit}`
    const sortItem = '_sort=createdAt:desc'
    
    const url = `${BASE_URL}/games?${limitItems}&${sortItem}`
    const response = await fetch(url)
    const result = await response.json()

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}

export async function getGamesPlatformApi(platform, limit, start) {
  try {
    const limitItems = `_limit=${limit}`
    const sortItems = `_sort=createdAt:desc`
    const startItems = `_start=${start}`

    const url = `${BASE_URL}/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`
    const response = await fetch(url)
    const result = await response.json()

    return result
  
  }catch(err) {
    console.log(err)
    return null
  }
}

export async function getTotalGamesPlatformApi(platform) {
  try {
    const url = `${BASE_URL}/games/count?platform.url=${platform}`
    const response = await fetch(url)
    const result = await response.json()

    return result
    
  }catch(err) {
    console.log(err)
    return null
  }
}