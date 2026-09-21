import express from "express";
import fs from "fs";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Locate the built client bundle.
  // - Bundled server (dist/index.js): __dirname === dist, so assets are in dist/public
  // - Running from source (server/index.ts): assets are in <root>/dist/public
  // Resolving by existence keeps the server working on Windows, Linux and in
  // containers without relying on shell-specific `NODE_ENV=x` syntax.
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(__dirname, "..", "dist", "public"),
  ];
  const staticPath = candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0];

  if (!fs.existsSync(path.join(staticPath, "index.html"))) {
    throw new Error(
      `No client build found at ${staticPath}. Run "pnpm build" before starting the server.`,
    );
  }

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes.
  // Requests for real files that no longer exist (e.g. a stale hashed bundle at
  // /assets/index-OLD.js) must return 404 instead of the HTML shell, otherwise
  // browsers and CDNs cache HTML under a JS/CSS URL and pages break with
  // "Unexpected token '<'" errors.
  app.get("*", (req, res) => {
    if (path.extname(req.path)) {
      res.status(404).type("text/plain").send("Not found");
      return;
    }

    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
