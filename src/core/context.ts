import { createContext } from 'react';
import type { ProgressiveDepthContextValue, VisibilityMap } from './types';
import { DEFAULT_VISIBILITY_MAP } from './constants';

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
 * Context for the visibility map configuration.
 * Allows layer components to access custom visibility rules
 * without prop drilling.
 */
export const VisibilityMapContext =
  createContext<VisibilityMap>(DEFAULT_VISIBILITY_MAP);
