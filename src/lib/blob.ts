export async function uploadToBlob(file: File): Promise<string> {
  const response = await fetch('/api/files/upload', {
    method: 'POST',
    headers: {
      'x-filename': file.name,
      'content-type': file.type,
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file to Vercel Blob');
  }

  const blob = await response.json();
  return blob.url;
}
