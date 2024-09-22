"use server";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default async function Login() {
  // const router = useRouter();
  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    const formdata = new FormData(
      document.querySelector("form") as HTMLFormElement
    );
    const payload: { [key: string]: FormDataEntryValue } = {};
    formdata.forEach((value, key) => {
      payload[key] = value;
    });
    const res = await fetch("/api/test/login/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.ok) {
      // router.push("/test/content");
    }
  }

  return (
    <>
      <div>Login Form</div>
      <form>
        {/* <form onSubmit={(e) => submitHandler(e)}> */}
        <div>
          <label htmlFor="username">Username: </label>
          <input name="username" id="username"></input>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input name="password" id="password"></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
