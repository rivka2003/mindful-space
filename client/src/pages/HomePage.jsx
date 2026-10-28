import { Link } from "react-router-dom";
import { contentConfigs } from "../features/content/contentConfigs";
import UiIcon from "../components/UiIcon";
import useAuth from "../hooks/useAuth";

const practiceIcons = ["spark", "sun", "headphones", "book", "leaf"];

function HomePage() {
  const contentCards = Object.entries(contentConfigs);
  const { isAuthenticated } = useAuth();

  return (
    <main className="page-container home-page">
      <section className="hero-panel">
        <div className="hero-panel__content">
          <p className="eyebrow"><span className="status-dot" /> YOUR DAILY DOSE OF STILLNESS</p>
          <h1>A softer pace.<br />A <em>clearer mind.</em></h1>
          <p className="section-copy">
            A little space to breathe, reflect, and reconnect. Discover simple
            practices that help you feel more like yourself, every day.
          </p>
        <div className="hero-panel__actions">
          <Link className="primary-button" to="/meditations">
            Find your calm <UiIcon name="arrow" />
          </Link>
          <Link className="ghost-button" to={isAuthenticated ? "/profile" : "/auth"}>
            {isAuthenticated ? "Your personal space" : "Create your space"}
          </Link>
        </div>
        <p className="hero-note"><UiIcon name="leaf" /> Small moments. Meaningful change.</p>
        </div>
        <div className="hero-art" role="img" aria-label="A peaceful sun rising above flowing green hills">
          <div className="hero-art__sun" />
          <div className="hero-art__hill hero-art__hill--back" />
          <div className="hero-art__hill hero-art__hill--middle" />
          <div className="hero-art__hill hero-art__hill--front" />
          <div className="hero-art__caption"><span>IN THIS MOMENT</span><p>Just breathe.</p><span>YOU ARE RIGHT WHERE YOU NEED TO BE.</span></div>
        </div>
      </section>

      <section className="practice-section" aria-labelledby="practice-heading">
        <div className="section-heading"><div><p className="eyebrow">A LITTLE INTENTION GOES A LONG WAY</p><h2 id="practice-heading">What do you need today?</h2></div><p>Find a practice that meets you where you are.</p></div>
        <div className="card-grid practice-grid">
        {contentCards.map(([key, config], index) => (
          <Link key={key} className={`feature-card practice-card practice-card--${index}`} to={`/${key}`}>
            <span className="practice-icon"><UiIcon name={practiceIcons[index]} /></span>
            <h3>{config.title}</h3>
            <p className="feature-card__copy">{config.intro}</p>
            <span className="practice-card__link">Explore <UiIcon name="arrow" /></span>
          </Link>
        ))}
        </div>
      </section>
      <aside className="daily-note"><UiIcon name="spark" /><p>You don't have to do it all today. Make a little room to simply be.<span>A GENTLE REMINDER</span></p></aside>
    </main>
  );
}

export default HomePage;
