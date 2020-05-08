import { useState, useEffect } from "react";
import httpClient from './httpClient'

export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function useLoadResource(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUrl() {
      const response = await httpClient.get(url)
      
      setData(response.data)
      setLoading(false)
    }
    fetchUrl()
  }, [url])

  return [data, loading]
}