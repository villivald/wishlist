//import "@/styles/globals.css";
import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const AuthStatusDiv = await AuthStatus();
  return (
    <html lang="en">
      <body>
        <Toaster />
        {AuthStatusDiv}
        {children}
      </body>
    </html>
  );
}
