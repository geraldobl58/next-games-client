import { BASE_URL } from '../utils/constatnts'
import { authFetch } from '../utils/fetch'

export async function createAddressApi(address, logout) {
  try {
    const url = `${BASE_URL}/addresses`
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    };

    const result = await authFetch(url, params, logout)

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}

export async function getAddressApi(idUser, logout) {
  try {
    const url = `${BASE_URL}/addresses?users_permissions_user=${idUser}`
    const result = await authFetch(url, null, logout)

    if (result.statusCode === 500) {
      throw "Whoops: Houve um erro no servidor!"
    }

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}

export async function deleteAddressApi(idAddress, logout) {
  try {
    const url = `${BASE_URL}/addresses/${idAddress}`
    const params = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await authFetch(url, params, logout)

    if (result.statusCode === 500) {
      throw "Whoops: Houve um erro no servidor!"
    }

    return true

  }catch(err) {
    console.log(err)
    return null
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const url = `${BASE_URL}/addresses/${idAddress}`
    const params = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address)
    };

    const result = await authFetch(url, params, logout)

    return result
    
  }catch(err) {
    console.log(err)
    return null
  }
}