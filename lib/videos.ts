import { createClient } from "@supabase/supabase-js"

export type CampoId = "campo-1" | "campo-2"

export type Video = {
  id: string
  campo: CampoId
  titulo: string
  descricao: string
  /** URL pública do vídeo (mp4) no Supabase Storage. */
  src: string
  /** Imagem de capa exibida antes de dar play. */
  poster: string
  /** Data de envio do arquivo, usada para ordenação/exibição. */
  data: string
}

export const CAMPOS: Record<CampoId, { nome: string; label: string }> = {
  "campo-1": { nome: "Fluminensinho Campo 1", label: "FLUMINENSINHO CAMPO 1" },
  "campo-2": { nome: "Fluminensinho Campo 2", label: "FLUMINENSINHO CAMPO 2" },
}

/** Nome do bucket público no Supabase Storage. */
const BUCKET = "LANCES"

/** Extensões de vídeo aceitas na galeria. */
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".mov", ".m4v"]

/** Capas de fallback (rotacionadas) usadas até haver thumbnail própria. */
const POSTERS = [
  "/thumbs/gol-1.png",
  "/thumbs/lance-2.png",
  "/thumbs/gol-3.png",
  "/thumbs/lance-4.png",
]

/**
 * Cliente Supabase apenas para o servidor. Usa a service role key para
 * garantir a listagem dos arquivos, independente das políticas do bucket.
 * NUNCA importe este módulo em código client-side.
 */
function getServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

function isVideoFile(name: string): boolean {
  const lower = name.toLowerCase()
  return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

/** Transforma "golaco-do-meio_campo.mp4" em "Golaço Do Meio Campo". */
function tituloFromFileName(name: string): string {
  const semExt = name.replace(/\.[^/.]+$/, "")
  const limpo = semExt.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim()
  if (!limpo) return "Lance"
  return limpo
    .split(" ")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ")
}

function formatarData(iso?: string | null): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

/**
 * Lista os vídeos de um campo diretamente do Supabase Storage.
 * Novos arquivos enviados para a pasta aparecem automaticamente — sem
 * precisar alterar o código.
 */
export async function getVideosByCampo(campo: CampoId): Promise<Video[]> {
  const supabase = getServerClient()
  if (!supabase) {
    console.log("[v0] Supabase não configurado: verifique as variáveis de ambiente.")
    return []
  }

  const { data, error } = await supabase.storage.from(BUCKET).list(campo, {
    limit: 1000,
    sortBy: { column: "created_at", order: "desc" },
  })

  if (error) {
    console.log("[v0] Erro ao listar vídeos do Storage:", error.message)
    return []
  }

  const arquivos = (data ?? []).filter(
    // Ignora pastas/placeholders e mantém apenas arquivos de vídeo.
    (item) => item.name && item.id !== null && isVideoFile(item.name),
  )

  return arquivos.map((item, index) => {
    const path = `${campo}/${item.name}`
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path)

    const dataEnvio =
      (item as { created_at?: string }).created_at ??
      (item as { updated_at?: string }).updated_at ??
      null

    return {
      id: path,
      campo,
      titulo: tituloFromFileName(item.name),
      descricao: formatarData(dataEnvio),
      src: publicUrl,
      poster: POSTERS[index % POSTERS.length],
      data: dataEnvio ?? "",
    }
  })
}

export function isCampoId(value: string): value is CampoId {
  return value === "campo-1" || value === "campo-2"
}
