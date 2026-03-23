import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminContentManager from "../components/admin/AdminContentManager";
import AdminUserManager from "../components/admin/AdminUserManager";

const adminTabs = [
  { key: "mantras", label: "Mantras" },
  { key: "meditations", label: "Meditations" },
  { key: "podcasts", label: "Podcasts" },
  { key: "journal-prompts", label: "Journal Prompts" },
  { key: "habits", label: "Habits" },
  { key: "users", label: "Users" },
];

function AdminPage() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("mantras");

  return (
    <main className="page-container">
      <section className="content-section">
        <p className="eyebrow">Admin</p>
        <h1>Dedicated management workspace</h1>
        <p className="section-copy">
          Public content pages stay clean. All management actions live here in one
          focused workflow.
        </p>

        {!isAdmin ? (
          <p className="status-text status-text--error">
            This area is available only to admin users.
          </p>
        ) : (
          <>
            <div className="admin-tabs">
              {adminTabs.map((tab) => (
                <button
                  key={tab.key}
                  className={
                    activeTab === tab.key
                      ? "tab-button tab-button--active"
                      : "tab-button"
                  }
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "users" ? (
              <AdminUserManager />
            ) : (
              <AdminContentManager contentType={activeTab} />
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default AdminPage;
