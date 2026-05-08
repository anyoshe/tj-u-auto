"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type CheckboxProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "type"
> & {
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({
  className,
  checked,
  defaultChecked,
  disabled,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const isChecked = Boolean(checked ?? defaultChecked)

  return (
    <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        className={cn(
          "peer size-4 appearance-none rounded-sm border border-input bg-transparent transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 checked:border-yellow-400 checked:bg-yellow-400",
          className
        )}
        onChange={(event) => onCheckedChange?.(event.currentTarget.checked)}
        {...props}
      />
      <Check
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute size-3 text-black opacity-0 peer-checked:opacity-100",
          isChecked && "opacity-100"
        )}
      />
    </span>
  )
}

export { Checkbox }
