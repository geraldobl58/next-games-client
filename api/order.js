import { BASE_URL } from '../utils/constatnts'
import { authFetch } from '../utils/fetch' 

export async function getOrderApi(idUser, logout) {
  try {
    const url = `${BASE_URL}/orders?_sort=createdAt:desc&users_permissions_user=${idUser}`
    const result = await authFetch(url, null, logout)
    
    return result

  }catch(err) {
    console.log(err)
    return null
  }
}