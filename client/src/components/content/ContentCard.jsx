import { useState } from "react";
import UiIcon from "../UiIcon";
import useAuth from "../../hooks/useAuth";
import useContentActions from "../../hooks/useContentActions";
import { getContentCategoryLabel } from "../../features/content/categoryOptions";

function ContentCard({ item, queryKey, supportsReminder = false }) {
  const { isAuthenticated, user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [pendingLiked, setPendingLiked] = useState(null);
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
    if (isLikePending || pendingLiked !== null) return;

    if (!isAuthenticated) {
      setFeedback("This action is available only for signed-in users.");
      return;
    }

    setFeedback("");
    setPendingLiked(!isLiked);

    try {
      if (isLiked) {
        await unlikeItem(item.id);
      } else {
        await likeItem(item.id);
      }
    } catch (error) {
      setFeedback(error.message || "Unable to update like.");
    } finally {
      setPendingLiked(null);
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
          className={`like-button${(pendingLiked ?? isLiked) ? " like-button--active" : ""}`}
          aria-label={`${(pendingLiked ?? isLiked) ? "Unlike" : "Like"} ${item.title}`}
          aria-pressed={pendingLiked ?? isLiked}
          aria-busy={isLikePending}
          disabled={isLikePending}
          onClick={handleLikeClick}
          type="button"
        >
          <UiIcon name="heart" filled={pendingLiked ?? isLiked} />
          <span>{item.likesCount ?? 0}</span>
        </button>
        {supportsReminder ? (
          <button
            className={`reminder-button${isReminderActive ? " reminder-button--active" : ""}`}
            aria-pressed={isReminderActive}
            aria-label={`${isReminderActive ? "Remove reminder for" : "Set reminder for"} ${item.title}`}
            disabled={isReminderPending}
            onClick={handleReminderClick}
            type="button"
          >
            <UiIcon name={isReminderActive ? "check" : "bell"} />
            {isReminderPending
              ? "Saving..."
              : isReminderActive
                ? "Remove reminder"
                : "Reminder"}
          </button>
        ) : null}
      </div>

      {!isAuthenticated || feedback ? (
        <p className="hint-text" role="status">
          {feedback ||
            `Likes${supportsReminder ? " and reminders" : ""} are available only for signed-in users.`}
        </p>
      ) : null}
    </article>
  );
}

export default ContentCard;
