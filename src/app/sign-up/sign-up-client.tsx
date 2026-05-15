"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Mail, User } from "lucide-react"
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
import { useRegister } from "@/hooks/auth/useRegister"
import { ApiRequestError } from "@/lib/axios/axios"
import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/register.schema"
import { useAppSelector } from "@/store/hooks"

export function SignUpClient() {
  const router = useRouter()
  const hydrated = useAppSelector((s) => s.auth.hydrated)
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)
  const register = useRegister()
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (!hydrated) return
    if (isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [hydrated, isAuthenticated, router])

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
    mode: "onChange",
    reValidateMode: "onChange",
  })
  const { isValid } = useFormState({ control: form.control })

  async function onSubmit(values: RegisterFormValues) {
    try {
      await register.mutateAsync(values)
    } catch (error) {
      const message =
        error instanceof ApiRequestError
          ? error.message
          : "Unable to create your account. Please try again."
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
          Create account
        </CardTitle>
        <CardDescription className="text-muted-foreground mt-1 text-[13px] leading-snug">
          Register to get started. You&apos;ll be signed in automatically.
        </CardDescription>
      </CardHeader>
      <form
        className="contents"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <CardContent className="flex flex-col gap-2 px-5 pb-5 pt-3 sm:px-6">
          <Input
            label="Name"
            autoComplete="name"
            placeholder="Jane Doe"
            leftIcon={<User className="size-4" />}
            error={form.formState.errors.name?.message}
            disabled={register.isPending}
            {...form.register("name")}
          />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            leftIcon={<Mail className="size-4" />}
            error={form.formState.errors.email?.message}
            disabled={register.isPending}
            {...form.register("email")}
          />
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            error={form.formState.errors.password?.message}
            disabled={register.isPending}
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
              loading={register.isPending}
              loadingText="Creating account…"
              disabled={register.isPending || !isValid}
            >
              Sign up
            </Button>
            <p className="text-muted-foreground text-center text-xs leading-normal">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
