import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function App() {
  const { data, error } = useSWR(
    "http://localhost:3000/api/get-posts-list",
    fetcher
  );
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  console.log('data->',data)
  return (
    <div>
      <h1>{data[0].id}</h1>
      <p>{data[1].id}</p>
      <strong>👁 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
