
'use client' // Error components must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/site-header' // Optional: Include header for context

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
     <>
     {/* <SiteHeader /> */}
     <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
       <h2 className="text-2xl font-bold text-destructive mb-4">Something went wrong!</h2>
       <p className="text-muted-foreground mb-6">
         An unexpected error occurred. Please try again later.
       </p>
       {/* Optional: Display error message in development */}
       {process.env.NODE_ENV === 'development' && (
         <pre className="text-xs bg-muted p-4 rounded-md overflow-auto max-w-full mb-6">
           {error.message}
           {error.digest && `\nDigest: ${error.digest}`}
           {error.stack && `\nStack: ${error.stack}`}
         </pre>
       )}
       <Button
         onClick={
           // Attempt to recover by trying to re-render the segment
           () => reset()
         }
       >
         Try again
       </Button>
     </div>
     </>
  )
}
