import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const contentLinks = [
  { to: "/mantras", label: "Mantras" },
  { to: "/meditations", label: "Meditations" },
  { to: "/podcasts", label: "Podcasts" },
  { to: "/journal-prompts", label: "Journal" },
  { to: "/habits", label: "Habits" },
];

function Header() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-brand" to="/">
          Mindful Space
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          {contentLinks.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " site-nav__link--active" : ""}`
              }
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            className={({ isActive }) =>
              `site-nav__link${isActive ? " site-nav__link--active" : ""}`
            }
            to="/profile"
          >
            Profile
          </NavLink>
          {isAdmin ? (
            <NavLink
              className={({ isActive }) =>
                `site-nav__link${isActive ? " site-nav__link--active" : ""}`
              }
              to="/admin"
            >
              Admin
            </NavLink>
          ) : null}
        </nav>

        <div className="site-header__actions">
          {isAuthenticated ? (
            <>
              <span className="user-chip">{user?.name}</span>
              <button className="ghost-button" onClick={logout} type="button">
                Logout
              </button>
            </>
          ) : (
            <Link className="primary-button" to="/auth">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
