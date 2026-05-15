import { Suspense } from "react"

import { SignInClient } from "./sign-in-client"

export default function SignInPage() {
  return (
    <div className="bg-muted/40 flex min-h-full flex-1 items-center justify-center p-4 md:p-8">
      <Suspense
        fallback={
          <div className="text-muted-foreground text-sm" role="status">
            Loading…
          </div>
        }
      >
        <SignInClient />
      </Suspense>
    </div>
  )
}
