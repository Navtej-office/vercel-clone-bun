export function deploymentIdFromHost(host: string): string | null {
  return host.split(".")[0] ?? null;
}