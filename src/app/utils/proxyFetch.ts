export default async function proxyFetch(input: string | URL | globalThis.Request, init: RequestInit = {}) {
  const baseURL = (process.env.NODE_ENV === 'development') ? 'http:localhost:3000' : process.env.baseURL;
  console.log('baseURL: ', baseURL)
  console.log('init: ', init)
  return (input.toString().startsWith('/')) ? fetch(`${baseURL}${input}`, init) : fetch(`${baseURL}/${input}`, init)
}