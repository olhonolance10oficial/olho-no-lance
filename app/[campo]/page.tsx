import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { SiteLogo } from "@/components/site-logo"
import { VideoGallery } from "@/components/video-gallery"
import { CAMPOS, getVideosByCampo, isCampoId } from "@/lib/videos"

export function generateStaticParams() {
  return [{ campo: "campo-1" }, { campo: "campo-2" }]
}

// Revalida a listagem periodicamente para que novos vídeos enviados ao
// Supabase Storage apareçam automaticamente, sem alterar o código.
export const revalidate = 30

export default async function CampoPage({
  params,
}: {
  params: Promise<{ campo: string }>
}) {
  const { campo } = await params

  if (!isCampoId(campo)) {
    notFound()
  }

  const videos = await getVideosByCampo(campo)
  const info = CAMPOS[campo]

  return (
    <main className="min-h-dvh">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
          <SiteLogo className="text-base" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </Link>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Galeria
            </span>
            <h1 className="mt-1 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
              {info.label}
            </h1>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-muted-foreground">
            {videos.length} {videos.length === 1 ? "vídeo" : "vídeos"}
          </span>
        </div>

        <VideoGallery videos={videos} />
      </section>
    </main>
  )
}
