import { BASE_URL } from '../utils/constatnts'

export async function getPlatformApi() {
  try {
    const url = `${BASE_URL}/platforms?_sort=position:asc`
    const response = await fetch(url)
    const result = await response.json()

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}