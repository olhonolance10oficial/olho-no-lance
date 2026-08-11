import Link from "next/link"
import { Eye } from "lucide-react"

export function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-display font-bold uppercase tracking-tight ${className}`}
      aria-label="OLHO NO LANCE - página inicial"
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Eye className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-none">
        OLHO NO <span className="text-primary">LANCE</span>
      </span>
    </Link>
  )
}
