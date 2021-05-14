import { TOKEN } from '../utils/constatnts'

export function setToken(token) {
  localStorage.setItem(TOKEN, token)
}

export function getToken() {
  return localStorage.getItem(TOKEN)
}