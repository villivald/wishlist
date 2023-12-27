import ProfilePage from "@/components/profile";
import AuthStatus from "@/components/auth-status";

export default async function Profile() {
  const session = await AuthStatus();

  return (
    <div>
      <ProfilePage session={session} />
    </div>
  );
}
