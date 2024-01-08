import ProfilePage from "@/components/profile";
import AuthStatus from "@/components/auth-status";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "My Profile",
});

export default async function Profile() {
  const session = await AuthStatus();

  return (
    <div>
      <ProfilePage session={session} />
    </div>
  );
}
