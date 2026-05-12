import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { put } from "@vercel/blob";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vercel Blob Upload Endpoint
  app.post("/api/upload", async (req, res) => {
    try {
      const { filename, contentType } = req.body;
      
      // Note: In a real app, you would validate the file type and size here
      // and maybe check the user's session.
      
      // For Vite environment, we use process.env.BLOB_READ_WRITE_TOKEN
      const token = process.env.BLOB_READ_WRITE_TOKEN;
      if (!token) {
        return res.status(500).json({ error: "BLOB_READ_WRITE_TOKEN not configured" });
      }

      // We handle the actual stream in a client-side call to @vercel/blob 
      // but if we want to keep the key HIDDEN, we must do the 'put' here or use a client token.
      // The easiest way to keep it hidden is to proxy the upload.
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // Alternative: Generate a client token for Vercel Blob (more scalable)
  // But let's stick to a simpler proxy for now or direct 'put' if small files.
  
  // Real implementation for Vercl Blob (Server-side):
  app.post("/api/files/upload", express.raw({ type: "*/*", limit: "10mb" }), async (req, res) => {
    try {
      const filename = req.headers["x-filename"] as string || "upload.bin";
      const contentType = req.headers["content-type"] || "application/octet-stream";
      
      const blob = await put(filename, req.body, {
        access: "public",
        contentType,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      res.json(blob);
    } catch (error) {
      console.error("Error uploading to Vercel Blob:", error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
