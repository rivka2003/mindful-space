import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  createHabit,
  deleteHabit,
  updateHabit,
} from "../../api/habitsApi";
import {
  createJournalPrompt,
  deleteJournalPrompt,
  updateJournalPrompt,
} from "../../api/journalPromptsApi";
import {
  createMantra,
  deleteMantra,
  updateMantra,
} from "../../api/mantrasApi";
import {
  createMeditation,
  deleteMeditation,
  updateMeditation,
} from "../../api/meditationsApi";
import {
  createPodcast,
  deletePodcast,
  updatePodcast,
} from "../../api/podcastsApi";
import { adminContentConfigs } from "../../features/admin/adminConfigs";
import {
  DEFAULT_CONTENT_CATEGORY,
  getContentCategoryLabel,
} from "../../features/content/categoryOptions";

function getOptionValue(option) {
  return typeof option === "string" ? option : option.value;
}

function getOptionLabel(option) {
  return typeof option === "string" ? option : option.label;
}

const adminContentApi = {
  mantras: {
    create: createMantra,
    update: updateMantra,
    remove: deleteMantra,
  },
  meditations: {
    create: createMeditation,
    update: updateMeditation,
    remove: deleteMeditation,
  },
  podcasts: {
    create: createPodcast,
    update: updatePodcast,
    remove: deletePodcast,
  },
  "journal-prompts": {
    create: createJournalPrompt,
    update: updateJournalPrompt,
    remove: deleteJournalPrompt,
  },
  habits: {
    create: createHabit,
    update: updateHabit,
    remove: deleteHabit,
  },
};

function buildInitialState(fields, item) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.name] =
      item?.[field.name] ??
      (field.name === "category"
        ? DEFAULT_CONTENT_CATEGORY
        : field.type === "select"
          ? getOptionValue(field.options[0])
          : "");
    return accumulator;
  }, {});
}

function normalizePayload(fields, formState) {
  const payload = {};

  fields.forEach((field) => {
    const rawValue = formState[field.name];

    if (field.type === "number") {
      if (rawValue === "" || rawValue === null || rawValue === undefined) {
        return;
      }

      payload[field.name] = Number(rawValue);
      return;
    }

    if (typeof rawValue === "string") {
      const cleanedValue = rawValue.trim();

      if (!cleanedValue && !field.required) {
        return;
      }

      payload[field.name] = cleanedValue;
      return;
    }

    if (rawValue !== undefined) {
      payload[field.name] = rawValue;
    }
  });

  return payload;
}

function formatItemTitle(item) {
  return item.title || item.text || item.question || "Untitled item";
}

function AdminContentManager({
  contentType,
  scope = "all",
  heading,
  listHeading,
  emptyMessage = "No items found.",
}) {
  const config = adminContentConfigs[contentType];
  const { data = [], isLoading, isError, error } = config.useContentQuery({ scope });
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState(() =>
    buildInitialState(config.fields, null)
  );

  const visibleItems = useMemo(() => data || [], [data]);
  const actions = adminContentApi[contentType];

  function resetForm() {
    setEditingItem(null);
    setFormState(buildInitialState(config.fields, null));
  }

  useEffect(() => {
    setEditingItem(null);
    setFormState(buildInitialState(config.fields, null));
    setFeedback("");
  }, [config.fields, contentType, scope]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFeedback("");
    setFormState(buildInitialState(config.fields, item));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      const payload = normalizePayload(config.fields, formState);

      if (editingItem) {
        await actions.update(editingItem.id, payload, token);
        setFeedback("Item updated.");
      } else {
        await actions.create(payload, token);
        setFeedback("Item created.");
      }

      await queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      resetForm();
    } catch (submitError) {
      setFeedback(submitError.message || "Unable to save item.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(itemId) {
    if (!window.confirm("Delete this item?")) {
      return;
    }

    setFeedback("");
    setIsSubmitting(true);

    try {
      await actions.remove(itemId, token);
      await queryClient.invalidateQueries({ queryKey: [config.queryKey] });
      if (editingItem?.id === itemId) {
        resetForm();
      }
      setFeedback("Item deleted.");
    } catch (deleteError) {
      setFeedback(deleteError.message || "Unable to delete item.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="admin-layout">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>
          {editingItem
            ? `Edit ${config.title}`
            : heading || `Create ${config.title}`}
        </h2>

        {config.fields.map((field) => (
          <label key={field.name} className="field">
            <span>{field.label}</span>
            {field.type === "textarea" ? (
              <textarea
                className="field-textarea"
                name={field.name}
                onChange={handleChange}
                required={field.required}
                value={formState[field.name] ?? ""}
              />
            ) : field.type === "select" ? (
              <select
                className="filter-select"
                name={field.name}
                onChange={handleChange}
                value={formState[field.name] ?? getOptionValue(field.options[0])}
              >
                {field.options.map((option) => (
                  <option key={getOptionValue(option)} value={getOptionValue(option)}>
                    {getOptionLabel(option)}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                onChange={handleChange}
                required={field.required}
                type={field.type}
                value={formState[field.name] ?? ""}
              />
            )}
          </label>
        ))}

        {feedback ? <p className="status-text">{feedback}</p> : null}

        <div className="admin-actions">
          <button className="primary-button" disabled={isSubmitting} type="submit">
            {editingItem ? "Save changes" : "Create item"}
          </button>
          {editingItem ? (
            <button className="ghost-button" onClick={resetForm} type="button">
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="admin-list">
        <h2>{listHeading || `${config.title} items`}</h2>
        {isLoading ? <p className="status-text">Loading items...</p> : null}
        {isError ? (
          <p className="status-text status-text--error">
            {error?.message || "Unable to load items."}
          </p>
        ) : null}

        {!isLoading && !isError && visibleItems.length === 0 ? (
          <p className="status-text">{emptyMessage}</p>
        ) : null}

        {visibleItems.map((item) => (
          <article key={item.id} className="admin-list-item">
            <div>
              <h3>{formatItemTitle(item)}</h3>
              <p className="feature-card__copy">
                Category: {getContentCategoryLabel(item.category)}
              </p>
              <p className="feature-card__copy">
                Visibility: {item.visibility || "public"} | Likes: {item.likesCount}
              </p>
            </div>
            <div className="admin-actions">
              <button
                className="ghost-button"
                onClick={() => handleEdit(item)}
                type="button"
              >
                Edit
              </button>
              <button
                className="ghost-button"
                disabled={isSubmitting}
                onClick={() => handleDelete(item.id)}
                type="button"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AdminContentManager;
