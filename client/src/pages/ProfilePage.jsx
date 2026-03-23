import { useState } from "react";
import AdminContentManager from "../components/admin/AdminContentManager";
import useAuth from "../hooks/useAuth";
import useFavorites from "../hooks/useFavorites";
import { contentConfigs } from "../features/content/contentConfigs";

const contentTabs = Object.entries(contentConfigs).map(([key, config]) => ({
  key,
  label: config.title,
}));

function ProfilePage() {
  const { isAuthenticated, user } = useAuth();
  const { data: favorites = [], isLoading } = useFavorites();
  const [activeTab, setActiveTab] = useState(contentTabs[0].key);

  return (
    <main className="page-container">
      <section className="content-section">
        <p className="eyebrow">Profile</p>
        <h1>Your personal area</h1>
        {!isAuthenticated ? (
          <p className="section-copy">
            Sign in to view liked content and active reminder subscriptions.
          </p>
        ) : (
          <div className="profile-grid">
            <article className="feature-card">
              <h2>{user?.name}</h2>
              <p className="feature-card__copy">{user?.email}</p>
              <p className="feature-card__copy">Role: {user?.role}</p>
            </article>
            <article className="feature-card">
              <h2>Liked content</h2>
              {isLoading ? <p className="feature-card__copy">Loading favorites...</p> : null}
              {!isLoading && favorites.length === 0 ? (
                <p className="feature-card__copy">No liked content yet.</p>
              ) : null}
              {!isLoading && favorites.length > 0 ? (
                <ul className="content-summary-list">
                  {favorites.map((favorite) => (
                    <li key={`${favorite.entityType}-${favorite.item?.id || "missing"}`}>
                      {favorite.item?.title || "Unavailable item"} ({favorite.entityType})
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
            <article className="feature-card">
              <h2>Reminder subscriptions</h2>
              {!user?.reminderSubscriptions?.length ? (
                <p className="feature-card__copy">No active reminder subscriptions.</p>
              ) : (
                <ul className="content-summary-list">
                  {user.reminderSubscriptions
                    .filter((subscription) => subscription.isActive)
                    .map((subscription) => (
                      <li key={`${subscription.entityType}-${subscription.entityId}`}>
                        {subscription.entityType}: {String(subscription.entityId)}
                      </li>
                    ))}
                </ul>
              )}
            </article>

            <article className="feature-card profile-manager-card">
              <h2>My content</h2>
              <p className="feature-card__copy">
                Create content, choose whether it is public or private, and manage
                only the items you created.
              </p>
            </article>
          </div>
        )}

        {isAuthenticated ? (
          <>
            <div className="admin-tabs">
              {contentTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={
                    activeTab === tab.key ? "tab-button tab-button--active" : "tab-button"
                  }
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AdminContentManager
              contentType={activeTab}
              emptyMessage="You have not created any items in this section yet."
              heading={`Create ${contentConfigs[activeTab].title}`}
              listHeading={`Your ${contentConfigs[activeTab].title}`}
              scope="mine"
            />
          </>
        ) : null}
      </section>
    </main>
  );
}

export default ProfilePage;
