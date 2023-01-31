import Form from "@/components/form";
import styles from "@/styles/SignupPage.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h3>Sign Up</h3>
          <p>Create an account with your email and password</p>
        </div>
        <Form type="register" />
      </div>
    </div>
  );
}
