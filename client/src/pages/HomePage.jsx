import { Link } from "react-router-dom";
import { contentConfigs } from "../features/content/contentConfigs";

function HomePage() {
  const contentCards = Object.entries(contentConfigs);

  return (
    <main className="page-container">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Mindful Space</p>
          <h1>Simple tools for calm, focus, and consistent inner work.</h1>
          <p className="section-copy">
            Browse public wellbeing content, save what you love after login, and
            keep the experience focused and clean.
          </p>
        </div>

        <div className="hero-panel__actions">
          <Link className="primary-button" to="/auth">
            Login or Register
          </Link>
          <Link className="ghost-button" to="/mantras">
            Explore content
          </Link>
        </div>
      </section>

      <section className="card-grid">
        {contentCards.map(([key, config]) => (
          <article key={key} className="feature-card">
            <p className="eyebrow">{config.title}</p>
            <p className="feature-card__copy">{config.intro}</p>
            <Link className="inline-link" to={`/${key}`}>
              Open {config.title}
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
