import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { CAMPOS, type CampoId } from "@/lib/videos"

const campos: CampoId[] = ["campo-1", "campo-2"]

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden">
      {/* Faixas de campo ao fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--color-primary) 0 2px, transparent 2px 120px)",
        }}
      />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6">
        <SiteLogo className="text-lg" />
        <span className="hidden text-sm font-medium uppercase tracking-widest text-muted-foreground sm:block">
          Lances e Gols
        </span>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-start px-5 py-10 text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
          <Play className="size-3.5 fill-current" aria-hidden="true" />
          Melhores momentos
        </span>

        <h1 className="text-balance font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl md:text-8xl">
          Olho no <span className="text-primary">Lance</span>
        </h1>

        <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Reviva os melhores lances e gols dos jogos. Escolha o campo e assista
          aos vídeos.
        </p>

        <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          {campos.map((id) => (
            <Link
              key={id}
              href={`/${id}`}
              className="group relative flex flex-col items-start justify-between overflow-hidden rounded-2xl border border-border bg-card p-7 text-left transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-8 font-display text-9xl font-bold text-primary/10 transition-transform duration-300 group-hover:scale-110"
              >
                {id === "campo-1" ? "1" : "2"}
              </span>
              <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Assistir
              </span>
              <span className="mt-16 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                {CAMPOS[id].label}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Ver vídeos
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-5 py-6 text-center text-xs text-muted-foreground">
        {"OLHO NO LANCE — todos os lances, num só lugar."}
      </footer>
    </main>
  )
}
