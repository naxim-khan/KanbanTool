import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { Button as ShadcnButton, buttonVariants } from "@/components/ui/button"
import { Spinner } from "@/components/Spinner"
import { cn } from "@/lib/utils"

export type ButtonProps = Omit<
  React.ComponentProps<typeof ShadcnButton>,
  "children"
> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    loading?: boolean
    loadingText?: string
    fullWidth?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      fullWidth,
      disabled,
      ...props
    },
    ref
  ) {
    const isDisabled = Boolean(disabled || loading)

    if (asChild) {
      return (
        <ShadcnButton
          ref={ref}
          variant={variant}
          size={size}
          asChild
          className={cn(fullWidth && "w-full", className)}
          disabled={isDisabled}
          aria-busy={loading || undefined}
          {...props}
        >
          {children}
        </ShadcnButton>
      )
    }

    return (
      <ShadcnButton
        ref={ref}
        variant={variant}
        size={size}
        className={cn(fullWidth && "w-full", className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        {...props}
      >
        <span className="relative inline-flex min-h-[1.5rem] items-center justify-center gap-2">
          <span
            className={cn(
              "inline-flex items-center justify-center gap-2",
              loading && "invisible"
            )}
            aria-hidden={loading || undefined}
          >
            {leftIcon ? (
              <span className="inline-flex shrink-0 text-current [&_svg]:size-[1.125rem]">
                {leftIcon}
              </span>
            ) : null}
            {children}
            {rightIcon ? (
              <span className="inline-flex shrink-0 text-current [&_svg]:size-[1.125rem]">
                {rightIcon}
              </span>
            ) : null}
          </span>
          {loading ? (
            <span className="pointer-events-none absolute inset-0 inline-flex items-center justify-center gap-2">
              <Spinner className="text-current" />
              {loadingText ? (
                <span className="truncate">{loadingText}</span>
              ) : null}
            </span>
          ) : null}
        </span>
      </ShadcnButton>
    )
  }
)

Button.displayName = "Button"
