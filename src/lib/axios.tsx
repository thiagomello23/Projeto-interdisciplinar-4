import axios from "axios";
import { localStorageKey } from "../globals";

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  validateStatus: () => {
    return true
  }
})

export default async function fetcher(url: string) {
  const { data, status } = await api.get(url, {
    headers: {
      Authorization: localStorage.getItem(localStorageKey)
    }
  })

  if(status >= 400) {
    throw new Error(data.message)
  }

  return data;
}

// api.interceptors.request.use(() => {})