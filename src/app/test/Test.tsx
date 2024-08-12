"use client"

import { useDOMObject } from "@/hooks"
import "./test.css"
import { useEffect, useState } from "react"

export default function Test({ showTest }: { showTest: boolean }) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false)
  // const [testWrapper] = useDOMObject<[HTMLElement]>([{ from: 'id', value: 'test-wrapper' }])
  // const testWrapper = document.getElementById("test-animation")
  const [testWrapper, setTestWrapper] = useState<HTMLDivElement | null>(null)

  testWrapper?.classList.add("test-animation")

  useEffect(() => {
    setTestWrapper(document.getElementById("test-wrapper") as HTMLDivElement)
  }, [])

  return (
    <div className="test-wrapper" id="test-wrapper">
    </div>
  )
}