import { useEffect } from 'react';
import type { ReadingMode, UsePersistenceOptions } from '../types';

/**
 * Optional hook that persists reading mode to storage.
 *
 * Intentionally separate from the provider so consumers opt in
 * explicitly and control the storage strategy.
 *
 * @example
 * ```tsx
 * function PersistenceSync() {
 *   const { mode } = useProgressiveDepth();
 *   usePersistence(mode);
 *   return null;
 * }
 *
 * function App() {
 *   const initialMode = usePersistence.getInitialMode() ?? 'deep';
 *   return (
 *     <Provider defaultMode={initialMode}>
 *       <PersistenceSync />
 *       {children}
 *     </Provider>
 *   );
 * }
 * ```
 */
export function usePersistence(
  mode: ReadingMode,
  options: UsePersistenceOptions = {}
): void {
  const {
    storageKey = 'progressive-depth-mode',
    storage = typeof window !== 'undefined' ? window.localStorage : undefined,
  } = options;

  useEffect(() => {
    if (storage) {
      storage.setItem(storageKey, mode);
    }
  }, [mode, storageKey, storage]);
}

/**
 * Static helper to read the initial mode from storage.
 * Safe for SSR -- returns undefined when storage is unavailable.
 */
usePersistence.getInitialMode = function getInitialMode(
  options: UsePersistenceOptions = {}
): ReadingMode | undefined {
  const {
    storageKey = 'progressive-depth-mode',
    storage = typeof window !== 'undefined' ? window.localStorage : undefined,
  } = options;

  if (!storage) return undefined;

  const stored = storage.getItem(storageKey);
  if (stored === 'canopy' || stored === 'standard' || stored === 'deep') {
    return stored;
  }
  return undefined;
};
