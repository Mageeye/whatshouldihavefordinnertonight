import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageShellProps {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
  className?: string
  align?: "left" | "center"
}

export function PageShell({
  title,
  description,
  children,
  actions,
  className,
  align = "left",
}: PageShellProps) {
  const isCentered = align === "center"

  return (
    <main className={cn("mx-auto w-full max-w-5xl px-4 py-8 md:px-6", className)}>
      <div
        className={cn(
          "flex flex-wrap items-start justify-between gap-4",
          isCentered && "flex-col items-center text-center"
        )}
      >
        <div className={cn(isCentered && "flex flex-col items-center")}> 
          <h1
            className={cn(
              "text-3xl font-semibold tracking-tight text-foreground",
              isCentered && "text-center"
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-2 text-sm text-muted-foreground",
                isCentered && "text-center"
              )}
            >
              {description}
            </p>
          )}
        </div>
        {actions}
      </div>
      <div className="mt-6">{children}</div>
    </main>
  )
}
