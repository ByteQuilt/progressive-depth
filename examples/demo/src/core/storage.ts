/**
 * The package's usePersistence hook falls back to window.localStorage, which throws when a browser blocks site data.
 * Resolve the storage here instead, and skip persistence when it is not available.
 */
export function getBrowserStorage(): Storage | undefined {
  try {
    const storage = window.localStorage;
    const probe = "progressive-depth-demo-probe";
    storage.setItem(probe, "1");
    storage.removeItem(probe);
    return storage;
  } catch {
    return undefined;
  }
}
