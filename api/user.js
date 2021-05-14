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
    console.log(result)

  }catch(err) {
    console.log(err);
    return null;
  }
}