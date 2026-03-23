import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useContentActions from "../../hooks/useContentActions";
import { getContentCategoryLabel } from "../../features/content/categoryOptions";

function ContentCard({ item, queryKey, supportsReminder = false }) {
  const { isAuthenticated, user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const { likeItem, unlikeItem, isLikePending, toggleReminder, isReminderPending } =
    useContentActions({
      entityType: item.entityType,
      queryKey,
    });

  const isLiked = Boolean(
    user?.likedContent?.some(
      (likedItem) =>
        likedItem.entityType === item.entityType &&
        String(likedItem.entityId) === String(item.id)
    )
  );

  const isReminderActive = Boolean(
    user?.reminderSubscriptions?.some(
      (subscription) =>
        subscription.entityType === item.entityType &&
        String(subscription.entityId) === String(item.id) &&
        subscription.isActive
    )
  );

  async function handleLikeClick() {
    if (!isAuthenticated) {
      setFeedback("This action is available only for signed-in users.");
      return;
    }

    setFeedback("");

    try {
      if (isLiked) {
        await unlikeItem(item.id);
      } else {
        await likeItem(item.id);
      }
    } catch (error) {
      setFeedback(error.message || "Unable to update like.");
    }
  }

  async function handleReminderClick() {
    if (!isAuthenticated) {
      setFeedback("This action is available only for signed-in users.");
      return;
    }

    setFeedback("");

    try {
      await toggleReminder({
        itemId: item.id,
        activate: !isReminderActive,
      });
    } catch (error) {
      setFeedback(error.message || "Unable to update reminder.");
    }
  }

  return (
    <article className="content-card">
      <div className="content-card__meta">
        <span className="pill">{getContentCategoryLabel(item.category)}</span>
        <span className="likes-counter">{item.likesCount} likes</span>
      </div>

      <h3 className="content-card__title">{item.title}</h3>
      <p className="content-card__description">{item.description}</p>

      {item.url ? (
        <a className="inline-link" href={item.url} rel="noreferrer" target="_blank">
          Open source
        </a>
      ) : null}

      <div className="content-card__actions">
        <button
          className="ghost-button"
          disabled={isLikePending}
          onClick={handleLikeClick}
          type="button"
        >
          {isLikePending ? "Saving..." : isLiked ? "Remove like" : "Like"}
        </button>
        {supportsReminder ? (
          <button
            className="ghost-button"
            disabled={isReminderPending}
            onClick={handleReminderClick}
            type="button"
          >
            {isReminderPending
              ? "Saving..."
              : isReminderActive
                ? "Remove reminder"
                : "Reminder"}
          </button>
        ) : null}
      </div>

      {!isAuthenticated || feedback ? (
        <p className="hint-text">
          {feedback ||
            `Likes${supportsReminder ? " and reminders" : ""} are available only for signed-in users.`}
        </p>
      ) : null}
    </article>
  );
}

export default ContentCard;
