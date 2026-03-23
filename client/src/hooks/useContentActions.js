import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  activateHabitReminder,
  deactivateHabitReminder,
  likeHabit,
  unlikeHabit,
} from "../api/habitsApi";
import {
  likeJournalPrompt,
  unlikeJournalPrompt,
} from "../api/journalPromptsApi";
import {
  activateMantraReminder,
  deactivateMantraReminder,
  likeMantra,
  unlikeMantra,
} from "../api/mantrasApi";
import {
  likeMeditation,
  unlikeMeditation,
} from "../api/meditationsApi";
import { likePodcast, unlikePodcast } from "../api/podcastsApi";
import useAuth from "./useAuth";

const actionMap = {
  Mantra: {
    like: likeMantra,
    unlike: unlikeMantra,
    activateReminder: activateMantraReminder,
    deactivateReminder: deactivateMantraReminder,
  },
  Meditation: {
    like: likeMeditation,
    unlike: unlikeMeditation,
  },
  Podcast: {
    like: likePodcast,
    unlike: unlikePodcast,
  },
  JournalPrompt: {
    like: likeJournalPrompt,
    unlike: unlikeJournalPrompt,
  },
  Habit: {
    like: likeHabit,
    unlike: unlikeHabit,
    activateReminder: activateHabitReminder,
    deactivateReminder: deactivateHabitReminder,
  },
};

function useContentActions({ entityType, queryKey }) {
  const queryClient = useQueryClient();
  const { token, refreshUser } = useAuth();

  const likeMutation = useMutation({
    mutationFn: (itemId) => actionMap[entityType].like(itemId, token),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryClient.invalidateQueries({ queryKey: ["favorites"] }),
        refreshUser(),
      ]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (itemId) => actionMap[entityType].unlike(itemId, token),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [queryKey] }),
        queryClient.invalidateQueries({ queryKey: ["favorites"] }),
        refreshUser(),
      ]);
    },
  });

  const reminderMutation = useMutation({
    mutationFn: ({ itemId, activate }) => {
      const action = activate
        ? actionMap[entityType].activateReminder
        : actionMap[entityType].deactivateReminder;

      return action(itemId, token);
    },
    onSuccess: async () => {
      await refreshUser();
    },
  });

  return {
    likeItem: likeMutation.mutateAsync,
    unlikeItem: unlikeMutation.mutateAsync,
    isLikePending: likeMutation.isPending || unlikeMutation.isPending,
    toggleReminder: reminderMutation.mutateAsync,
    isReminderPending: reminderMutation.isPending,
  };
}

export default useContentActions;
