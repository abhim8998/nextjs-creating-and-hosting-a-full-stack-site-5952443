export default async function fetchtest() {
  const response=await fetch('/api/hello')
  const data=await response.json()

  return <h1>
{data.message}
  </h1>
}