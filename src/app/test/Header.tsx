"use client"

import { useEffect, useState } from "react";

export default function Header({ header }: any) {
  console.log('header: ', header)
  let sid: any;
  // const getSid = async () => {
  //   const response = await fetch('/api/test/check', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/JSON"
  //     },
  //     cache: "no-cache"
  //   });
  //   const body = await response.json();
  //   sid = body.value
  //   console.log(body)

  //   if (sid !== undefined) {
  //     setContent(sid);
  //   }
  // }

  return (
    <>
      <h1>{header}</h1>
    </>
  )
}