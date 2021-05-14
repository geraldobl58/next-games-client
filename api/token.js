import { TOKEN } from '../utils/constatnts'

export function setToken(token) {
  localStorage.setItem(TOKEN, token)
}