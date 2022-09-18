import { useState, useEffect } from "react";

export default function Profile() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch('/api/get-media-list-fb')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    return (
      <div>
        <h1>{data[0].media_url}</h1>
        <p>{data[1].media_url}</p>
      </div>
    )
  }