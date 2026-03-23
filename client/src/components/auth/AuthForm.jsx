import { useState } from "react";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

function AuthForm({ mode = "login", onSubmit, isSubmitting, errorMessage }) {
  const [formState, setFormState] = useState(initialFormState);
  const isRegisterMode = mode === "register";

  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formState);
  }

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <p className="eyebrow">{isRegisterMode ? "Create account" : "Welcome back"}</p>
      <h1>{isRegisterMode ? "Register" : "Login"}</h1>

      {isRegisterMode ? (
        <label className="field">
          <span>Name</span>
          <input
            name="name"
            onChange={handleChange}
            required
            type="text"
            value={formState.name}
          />
        </label>
      ) : null}

      <label className="field">
        <span>Email</span>
        <input
          name="email"
          onChange={handleChange}
          required
          type="email"
          value={formState.email}
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={formState.password}
        />
      </label>

      {errorMessage ? <p className="status-text status-text--error">{errorMessage}</p> : null}

      <button className="primary-button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : isRegisterMode ? "Create account" : "Login"}
      </button>
    </form>
  );
}

export default AuthForm;
