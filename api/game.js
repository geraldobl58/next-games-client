import { BASE_URL } from '../utils/constatnts'

export async function getLastGameApi(limit) {
  try {
    const limitItems = `_limit=${limit}`
    const sortItem = '_sort=createAt:desc'
    
    const url = `${BASE_URL}/games?${limitItems}&${sortItem}`
    const response = await fetch(url)
    const result = await response.json()

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}