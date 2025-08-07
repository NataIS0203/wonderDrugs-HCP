export function download(
  fileName: string,
  data: string | ArrayBuffer | ArrayBufferView | Blob,
  mime = "text/plain",
  bom?: string | Uint8Array,
) {
  const blobData = bom === undefined ? [data] : [bom, data]
  const blob = new Blob(blobData, { type: mime })
  const a = document.createElement("a")

  a.download = fileName
  a.href = URL.createObjectURL(blob)
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(a.href)
    a.remove()
  }, 200)
}