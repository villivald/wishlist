import Form from "@/components/form";

export default function Login() {
  return (
    <div>
      <div>
        <h3>Sign In</h3>
        <p>Use your email and password to sign in</p>
      </div>
      <Form type="login" />
    </div>
  );
}
