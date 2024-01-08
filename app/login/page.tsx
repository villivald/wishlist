import Form from "@/components/form";
import { metadataElement } from "@/components/metadata";

import styles from "@/styles/SignupPage.module.css";

export const metadata = metadataElement({
  title: "Login Page",
});

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h3>Sign In</h3>
          <p>Use your email and password to sign in</p>
        </div>
        <Form type="login" />
      </div>
    </div>
  );
}
