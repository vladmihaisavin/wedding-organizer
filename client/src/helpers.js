import { useState, useEffect } from "react";
import httpClient from './httpClient'

export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPageName() {
  return ucFirst(window.location.pathname.split('/')[1])
}

export function useLoadResource(url, shouldLoad) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getResource() {
      setLoading(true)
      const response = await httpClient.get(url)
      
      setData(response.data)
      setLoading(false)
    }
    if (shouldLoad) {
      getResource()
    }
  }, [url, shouldLoad])

  return [data, loading]
}