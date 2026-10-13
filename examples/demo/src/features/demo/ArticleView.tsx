import { Canopy, Mycelium, Understory } from "@bytequilt/progressive-depth";
import type { Section } from "../../content/article";

/** The sample post, rendered with the package's styled layer components. */
export function ArticleView({ sections }: { sections: Section[] }) {
  return (
    <article className="article">
      {sections.map((section) => (
        <section key={section.heading}>
          <h3>{section.heading}</h3>
          <Canopy>
            {section.layers.canopy.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Canopy>
          <Understory>
            {section.layers.understory.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Understory>
          <Mycelium>
            {section.layers.mycelium.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </Mycelium>
        </section>
      ))}
    </article>
  );
}
