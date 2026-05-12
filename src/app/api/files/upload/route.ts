import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const filename = request.headers.get("x-filename") || "upload.bin";
    const contentType = request.headers.get("content-type") || "application/octet-stream";
    
    // In Next.js App Router, request.body is a ReadableStream
    const blob = await put(filename, request.body!, {
      access: "public",
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
