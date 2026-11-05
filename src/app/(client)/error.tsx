// app/error.tsx
'use client' // এটি অবশ্যই থাকতে হবে

import { LocalizedText } from "@/components/Language";
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // এররটি লগ করার জন্য
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 data-heading-tone="dark"><LocalizedText>{"Something went wrong."}</LocalizedText></h2>
      <button onClick={() => reset()}><LocalizedText>{"Try again"}</LocalizedText></button>
    </div>
  )
}