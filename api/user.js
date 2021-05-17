import { BASE_URL } from '../utils/constatnts'
import { authFetch } from '../utils/fetch'

export async function registerApi(formData) {
  try {
    const url = `${BASE_URL}/auth/local/register`
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }

    const response = await fetch(url, params)
    const result =  await response.json()
    
    return result

  }catch(err) {
    console.log(err);
    return null;
  }
}

export async function loginApi(formData) {
  try {
    const url = `${BASE_URL}/auth/local`
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    };

    const response = await fetch(url, params)
    const result = await response.json()

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}

export async function resetPasswordApi(email) {
  try {
    const url = `${BASE_URL}/auth/forgot-password`
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    };

    const response = await fetch(url, params)
    const result = await response.json()

    return result

  }catch(err) {
    console.log(err)
    return null
  }
}

export async function getMeApi(logout) {
  try {
    const url = `${BASE_URL}/users/me`
    const result = await authFetch(url, null, logout)

    return result ? result : null
    
  }catch(err) {
    console.log(err)
    return null
  }
}

export async function updateNameApi(idUser, data, logout) {
  try {
    const url = `${BASE_URL}/users/${idUser}`
    const params = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const result = await authFetch(url, params, logout)

    return result ? result : null
    
  }catch(err) {
    console.log(err)
    return null
  }
}

export async function updateEmailApi(idUser, email, logout) {
  try {
    const url = `${BASE_URL}/users/${idUser}`
    const params = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    };

    const result = await authFetch(url, params, logout)

    return result ? result : null
    
  }catch(err) {
    console.log(err)
    return null
  }
}

export async function updatePasswordApi(idUser, password, logout) {
  try {
    const url  = `${BASE_URL}/users/${idUser}`
    const params = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    };

    const result = await authFetch(url, params, logout)

    return result ? result : null
    
  }catch(err) {
    console.log(err)
    return null
  }
} 