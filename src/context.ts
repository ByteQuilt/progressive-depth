import { createContext, useContext } from 'react';
import type { ProgressiveDepthContextValue } from './types';

/**
 * Context for sharing reading mode state across layer components.
 *
 * Default mode is 'deep' so all content is visible when used
 * outside of a provider (graceful degradation).
 */
export const ProgressiveDepthContext =
  createContext<ProgressiveDepthContextValue>({
    mode: 'deep',
    setMode: () => {},
  });

/**
 * Hook to access the current reading mode and setter.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { mode, setMode } = useProgressiveDepth();
 *   return <p>Current mode: {mode}</p>;
 * }
 * ```
 */
export function useProgressiveDepth(): ProgressiveDepthContextValue {
  return useContext(ProgressiveDepthContext);
}
