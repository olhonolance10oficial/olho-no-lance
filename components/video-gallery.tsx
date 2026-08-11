"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Play, X } from "lucide-react"
import type { Video } from "@/lib/videos"

export function VideoGallery({ videos }: { videos: Video[] }) {
  const [ativo, setAtivo] = useState<Video | null>(null)

  // Fecha o player com a tecla Esc e bloqueia o scroll do fundo.
  useEffect(() => {
    if (!ativo) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAtivo(null)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [ativo])

  if (videos.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
        Nenhum vídeo disponível neste campo ainda.
      </p>
    )
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <li key={video.id}>
            <button
              type="button"
              onClick={() => setAtivo(video)}
              className="group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative block aspect-video overflow-hidden">
                <Image
                  src={video.poster || "/placeholder.svg"}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                  <Play className="size-6 fill-current" aria-hidden="true" />
                </span>
              </span>
              <span className="flex flex-col gap-1 p-4">
                <span className="font-display text-lg font-semibold uppercase leading-tight tracking-tight">
                  {video.titulo}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {video.descricao}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {ativo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ativo.titulo}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setAtivo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border p-4">
              <h2 className="font-display text-xl font-semibold uppercase tracking-tight">
                {ativo.titulo}
              </h2>
              <button
                type="button"
                onClick={() => setAtivo(null)}
                aria-label="Fechar player"
                className="flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <video
              key={ativo.id}
              src={ativo.src}
              poster={ativo.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
            <p className="p-4 text-sm leading-relaxed text-muted-foreground">
              {ativo.descricao}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
