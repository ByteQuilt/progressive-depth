import { LAYER_ORDER, type LayerName, useLayerVisibility } from "@bytequilt/progressive-depth";

/** The layers the surrounding Provider currently shows, as the package resolved them from its visibility map. */
export function useVisibleLayers(): LayerName[] {
  const states = { canopy: useLayerVisibility("canopy"), understory: useLayerVisibility("understory"), mycelium: useLayerVisibility("mycelium") };
  return LAYER_ORDER.filter((layer) => states[layer].isVisible);
}
