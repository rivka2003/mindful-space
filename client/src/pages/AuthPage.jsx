import { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import useAuth from "../hooks/useAuth";

function AuthPage() {
  const { isAuthenticated, login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate replace to="/profile" />;
  }

  async function handleSubmit(formState) {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (mode === "login") {
        await login({
          email: formState.email.trim(),
          password: formState.password,
        });
      } else {
        await register({
          name: formState.name.trim(),
          email: formState.email.trim(),
          password: formState.password,
        });
      }
    } catch (error) {
      setErrorMessage(error.message || "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-container page-container--narrow">
      <div className="auth-toggle">
        <button
          className={mode === "login" ? "tab-button tab-button--active" : "tab-button"}
          onClick={() => setMode("login")}
          type="button"
        >
          Login
        </button>
        <button
          className={mode === "register" ? "tab-button tab-button--active" : "tab-button"}
          onClick={() => setMode("register")}
          type="button"
        >
          Register
        </button>
      </div>

      <AuthForm
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
        mode={mode}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default AuthPage;
