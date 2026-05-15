"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/Input"
import { useLogin } from "@/hooks/auth/useLogin"
import { ApiRequestError } from "@/lib/axios/axios"
import { sanitizeReturnPath } from "@/lib/helpers/safe-return-url"
import { loginSchema, type LoginFormValues } from "@/schemas/login.schema"
import { useAppSelector } from "@/store/hooks"

export function SignInClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("from")
  const hydrated = useAppSelector((s) => s.auth.hydrated)
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const login = useLogin(returnTo)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!hydrated) return
    if (isAuthenticated) {
      router.replace(sanitizeReturnPath(returnTo) ?? "/dashboard")
    }
  }, [hydrated, isAuthenticated, router, returnTo])

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  })
  const { isValid } = useFormState({ control: form.control })

  async function onSubmit(values: LoginFormValues) {
    try {
      await login.mutateAsync(values)
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : "Unable to sign in. Please try again."
      toast.error(message)
    }
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <Card className="w-full max-w-md gap-0 border-border/70 py-0 shadow-md ring-1 ring-border/50">
      <CardHeader className="border-b border-border/60 px-5 pb-3 pt-5 text-left sm:px-6">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Sign in
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 text-[13px] leading-snug">
          Enter your credentials to access your workspace.
        </CardDescription>
      </CardHeader>
      <form
        className="contents"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <CardContent className="flex flex-col gap-2 px-5 pb-5 pt-3 sm:px-6">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            leftIcon={<Mail className="size-4" />}
            error={form.formState.errors.email?.message}
            disabled={login.isPending}
            {...form.register("email")}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            error={form.formState.errors.password?.message}
            disabled={login.isPending}
            rightIcon={
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground inline-flex rounded-sm p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
            {...form.register("password")}
          />
          <div className="mt-1 flex flex-col gap-1">
            <Button
              type="submit"
              fullWidth
              loading={login.isPending}
              loadingText="Signing in…"
              disabled={login.isPending || !isValid}
            >
              Sign in
            </Button>
            <p className="text-muted-foreground text-center text-xs leading-normal">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
