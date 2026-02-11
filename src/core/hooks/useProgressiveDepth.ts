import { useContext } from 'react';
import { ProgressiveDepthContext } from '../context';
import type { ProgressiveDepthContextValue } from '../types';

/**
 * Hook to access the current reading mode and setter.
 *
 * Must be used within a ProgressiveDepthProvider or Provider primitive.
 * Falls back to 'deep' mode (all content visible) if no provider is found.
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
