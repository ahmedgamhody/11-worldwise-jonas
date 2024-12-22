import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("ahmedgamhody1@outlook.com");
  const [password, setPassword] = useState("123456");
  const nav = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    if (email.length !== 0 && password.length !== 0) {
      await login(email, password);
      nav("/app");
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      nav("/app", { replace: true });
    }
  }, [isAuthenticated, nav]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter password"
            required
          />
        </div>

        <div>
          <button className={styles.ctaLink}>Login</button>
        </div>
      </form>
    </main>
  );
}
