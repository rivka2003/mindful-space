export function mapUser(user) {
  return {
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    likedContent: user.likedContent || [],
    reminderSubscriptions: user.reminderSubscriptions || [],
  };
}
