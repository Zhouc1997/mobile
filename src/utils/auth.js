import Cookies from 'js-cookie'

const TokenKey = 'appToken'

export function getToken() {
  // return '9fb7fa7487c34e7d839907f0f0a946e7'
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
