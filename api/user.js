import { BASE_URL } from '../utils/constatnts'

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