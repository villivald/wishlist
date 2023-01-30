import Link from "next/link";

export default function Home() {
  return (
    <Link
      href="/protected"
      prefetch={false} // workaround until https://github.com/vercel/vercel/pull/8978 is deployed
    >
      Protected Page
    </Link>
  );
}
