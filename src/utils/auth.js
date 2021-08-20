import Cookies from "js-cookie";

const TokenKey = "Admin-Token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setStorage(key, val) {
  return localStorage.setItem(key, JSON.stringify(val));
}

export function removeStorage(key) {
  return localStorage.removeItem(key);
}
