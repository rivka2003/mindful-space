import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  deleteUserByAdmin,
  fetchUsers,
  updateUserByAdmin,
} from "../../api/authApi";

const initialUserForm = {
  name: "",
  email: "",
  role: "user",
};

function AdminUserManager() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => fetchUsers(token),
    enabled: Boolean(token),
  });
  const [editingUser, setEditingUser] = useState(null);
  const [formState, setFormState] = useState(initialUserForm);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleEdit(user) {
    setEditingUser(user);
    setFormState({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setFeedback("");
  }

  function resetForm() {
    setEditingUser(null);
    setFormState(initialUserForm);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!editingUser) {
      return;
    }

    setFeedback("");
    setIsSubmitting(true);

    try {
      await updateUserByAdmin(
        editingUser.id,
        {
          name: formState.name.trim(),
          email: formState.email.trim(),
          role: formState.role,
        },
        token
      );
      await queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setFeedback("User updated.");
      resetForm();
    } catch (submitError) {
      setFeedback(submitError.message || "Unable to update user.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(userId) {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    setFeedback("");
    setIsSubmitting(true);

    try {
      await deleteUserByAdmin(userId, token);
      await queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      if (editingUser?.id === userId) {
        resetForm();
      }
      setFeedback("User deleted.");
    } catch (deleteError) {
      setFeedback(deleteError.message || "Unable to delete user.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="admin-layout">
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>User management</h2>
        <p className="feature-card__copy">
          Select a user from the list to edit their basic details or role.
        </p>

        <label className="field">
          <span>Name</span>
          <input
            name="name"
            onChange={handleChange}
            value={formState.name}
            disabled={!editingUser}
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            value={formState.email}
            disabled={!editingUser}
          />
        </label>

        <label className="field">
          <span>Role</span>
          <select
            className="filter-select"
            name="role"
            onChange={handleChange}
            value={formState.role}
            disabled={!editingUser}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </label>

        {feedback ? <p className="status-text">{feedback}</p> : null}

        <div className="admin-actions">
          <button
            className="primary-button"
            disabled={!editingUser || isSubmitting}
            type="submit"
          >
            Save user
          </button>
          {editingUser ? (
            <button className="ghost-button" onClick={resetForm} type="button">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="admin-list">
        <h2>Users</h2>
        {isLoading ? <p className="status-text">Loading users...</p> : null}
        {isError ? (
          <p className="status-text status-text--error">
            {error?.message || "Unable to load users."}
          </p>
        ) : null}

        {data.map((user) => (
          <article key={user.id} className="admin-list-item">
            <div>
              <h3>{user.name}</h3>
              <p className="feature-card__copy">{user.email}</p>
              <p className="feature-card__copy">Role: {user.role}</p>
            </div>
            <div className="admin-actions">
              <button
                className="ghost-button"
                onClick={() => handleEdit(user)}
                type="button"
              >
                Edit
              </button>
              <button
                className="ghost-button"
                disabled={isSubmitting}
                onClick={() => handleDelete(user.id)}
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

export default AdminUserManager;
