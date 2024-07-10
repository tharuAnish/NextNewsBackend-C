"use client"

import { useEffect, useState } from "react"

import NewsList from "@/components/news-list"

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [news, setNews] = useState()

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true)
      const response = await fetch("http://localhost:8080/news")

      if (!response.ok) {
        setError("Failed to fetch News ..")
        setIsLoading(false)
      }
      const news = await response.json()
      setIsLoading(false)
      setNews(news)
    }
    fetchNews()
  }, [])

  if (isLoading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>News Page</h1>
      {news ? <NewsList news={news} /> : null}
    </>
  )
}
