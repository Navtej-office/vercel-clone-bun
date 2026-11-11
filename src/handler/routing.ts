import { error } from "node:console";
import { posix } from "node:path";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function deploymentIdFromHost(host: string): string | null {
  if (!host.includes(".")) {
    return null;
  }
  const label = host.split(".")[0] ?? "";
  return UUID.test(label) ? label : null;
}
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
};

export function contentTypeFor(path: string): string {
  return TYPES[posix.extname(path).toLowerCase()] ?? "application/octet-stream";
}


export function objectKeyFor(id: string, urlPath: string): string | null {
  const path = urlPath.replace(/^\/+/, "");
  if (path.split("/").includes("..")) return null;
  return `dist/${id}/${path === "" ? "index.html" : path}`;
}