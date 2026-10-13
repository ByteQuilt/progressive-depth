import type { LayerName } from "@bytequilt/progressive-depth";

/** One section of the sample post. Each layer is a list of paragraphs. */
export interface Section {
  heading: string;
  layers: Record<LayerName, string[]>;
}

export const ARTICLE: Section[] = [
  {
    heading: "Readers bring different amounts of time",
    layers: {
      canopy: ["Some readers have two minutes and some have twenty. A post can serve both if it is written in layers."],
      understory: [
        "Each section starts with a complete claim. The reasoning follows for readers who want it, and the evidence comes last, where only the readers who need it will find it.",
      ],
      mycelium: [
        "A skimmer who reads only the first layer of every section should still get the whole argument. That is the test for a canopy: read the canopies alone, and they should work as a summary of the post.",
        "Nothing is cut. The detail sits in the deepest layer, so a reader who wants the evidence can open it, and a reader who doesn't never has to scroll past it.",
      ],
    },
  },
  {
    heading: "Each layer has one job",
    layers: {
      canopy: ["The canopy states the claim. The understory explains why it holds. The mycelium holds the evidence."],
      understory: ["The understory has to add something the canopy didn't say. If it only rephrases the claim, delete it. One paragraph is usually enough."],
      mycelium: [
        "The mycelium is the only layer with real freedom of length. It can run to several paragraphs and include code, images and sources.",
        "As a rough check, each layer should be about 1.6 times as long as the one above it. If the understory is longer than the mycelium, the section probably doesn't need three layers.",
      ],
    },
  },
  {
    heading: "The reader chooses the depth",
    layers: {
      canopy: ["The page doesn't decide how deep to go. A toggle lets each reader pick Skim, Read or Deep Dive."],
      understory: ["Skim shows the canopy. Read adds the understory. Deep Dive shows everything, and it is the default, so nobody misses content by accident."],
      mycelium: [
        "Hidden layers collapse and are removed from the accessibility tree, so a screen reader announces only what is on screen. The toggle is a radio group: Tab reaches the selected option, and the arrow keys, Home and End move between options.",
        "If the three modes don't fit your content, pass your own visibility map and decide which layers each mode shows.",
      ],
    },
  },
];
