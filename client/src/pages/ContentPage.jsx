import { Navigate, useParams } from "react-router-dom";
import ContentCollection from "../components/content/ContentCollection";
import { contentConfigs } from "../features/content/contentConfigs";

function ContentPage() {
  const { contentType } = useParams();
  const config = contentConfigs[contentType];

  if (!config) {
    return <Navigate replace to="/" />;
  }

  const { data, isLoading, isError, error } = config.useContentQuery();

  return (
    <main className="page-container">
      <ContentCollection
        error={error}
        intro={config.intro}
        isError={isError}
        isLoading={isLoading}
        items={data || []}
        queryKey={config.queryKey}
        supportsReminder={config.supportsReminder}
        title={config.title}
      />
    </main>
  );
}

export default ContentPage;
