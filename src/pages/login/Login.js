import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Input } from "../../components/controls/Input";
import { Button } from "../../components/controls/Button";


// styles
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>login</h2>
      <label>
        <span>email</span>
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password</span>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <Button disabled={isPending} className="btn">
        {isPending ? "Loading" : "Login"}
      </Button>
      {error && <p>{error}</p>}
    </form>
  );
}
