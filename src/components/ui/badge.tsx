import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#FB77BF] text-white hover:bg-[#FB77BF]/90",
        secondary:
          "border-transparent bg-[#FDA26A] text-white hover:bg-[#FDA26A]/90",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-foreground border-border",
        success:
          "border-transparent bg-[#D3E76C] text-gray-800 hover:bg-[#D3E76C]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }