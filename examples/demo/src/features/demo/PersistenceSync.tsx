import { usePersistence, useProgressiveDepth } from "@bytequilt/progressive-depth";

/** Saves the reading mode to the given storage. The package leaves persistence to the app. */
export function PersistenceSync({ storage }: { storage: Storage }) {
  const { mode } = useProgressiveDepth();
  usePersistence(mode, { storage });
  return null;
}
