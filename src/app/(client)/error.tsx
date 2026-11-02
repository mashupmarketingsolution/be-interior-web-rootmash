// app/error.tsx
'use client' // এটি অবশ্যই থাকতে হবে

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
      <h2 data-heading-tone="dark">কিছু একটা ভুল হয়েছে!</h2>
      <button onClick={() => reset()}>আবার চেষ্টা করুন</button>
    </div>
  )
}