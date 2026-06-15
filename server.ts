import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_PATH = path.join(DATA_DIR, "config.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

// Basic directory setup
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// API: Get Config
app.get("/api/config", (req, res) => {
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const data = fs.readFileSync(CONFIG_PATH, "utf-8");
      console.log("Config loaded from filesystem");
      return res.json(JSON.parse(data));
    } catch (e) {
      console.error("Failed to read config:", e);
      return res.status(500).json({ error: "Failed to read config" });
    }
  }
  console.log("No config found, returning empty object");
  res.json({}); 
});

// API: Save Config
app.post("/api/config", (req, res) => {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(req.body, null, 2));
    console.log("Config saved successfully to:", CONFIG_PATH);
    res.json({ success: true });
  } catch (e) {
    console.error("Failed to save config:", e);
    res.status(500).json({ error: "Failed to save config" });
  }
});

// API: Upload Files
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.warn("Upload attempt with no file");
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  console.log(`File uploaded successfully: ${req.file.originalname} -> ${fileUrl}`);
  res.json({ url: fileUrl });
});

// Vite Middleware setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve uploads also in production
    app.use("/uploads", express.static(UPLOADS_DIR));
    
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Also serve uploads directory statically in dev (Vite might not handle it automatically if outside src)
  app.use("/uploads", express.static(UPLOADS_DIR));

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

setupVite();
