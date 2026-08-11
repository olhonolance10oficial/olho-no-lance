import Link from "next/link"

export function SiteLogo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="OLHO NO LANCE - página inicial"
    >
      <img
        src="/logo_olho_no_lance.png"
        alt="Olho no Lance"
        className="h-16 w-auto object-contain"
      />
    </Link>
  )
}
