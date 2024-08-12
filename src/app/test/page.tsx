"use client"

import { useDOMObject } from "@/hooks"
import { FormEvent, useState } from "react"
import Header from "./Header"
import Test from "./Test"

type SuccessLoginResponse = {
  status: 'success'
  username: string
}

type FailedLoginResponse = {
  status: 'error'
  message: string
}

type LoginResponse = SuccessLoginResponse | FailedLoginResponse

function Form() {
  const [header, setHeader] = useState<string>('Login')
  const [error, setError] = useState<string>('')
  const [form] = useDOMObject<[HTMLFormElement]>([{ from: 'query', value: 'form' }])
  async function submitHandler(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(form as HTMLFormElement);
    const payload = {
      username: '',
      password: ''
    }
    for (const [key, value] of formData) {
      payload[key as keyof typeof payload] = value as string;
    }
    const response: LoginResponse = await (await fetch('/api/test/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(payload),
      cache: "no-cache"
    })).json();

    if (response.status === 'success') {
      console.log(response.username)
      setHeader(response.username)
    }
  }

  return (
    <>
      <Header header={header} />
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="username" name="username" id="username" placeholder="Username" autoComplete="off"></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" placeholder="Password" autoComplete="off"></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default function Main() {
  const [showTest, setShowTest] = useState<boolean>(false)

  return (
    <>
      <div>
        <button onClick={() => setShowTest(true)}>
          click me
        </button>
        <h1>{process.env.NEXT_PUBLIC_TEST_CONTENT}</h1>
        {(showTest) ? <Test showTest={showTest} /> : null}
      </div>
    </>
  )
}