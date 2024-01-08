import PublicWishlists from "@/components/publicWishlists";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "Public Wishlists",
});

export default function Home() {
  return (
    <div>
      <PublicWishlists />
    </div>
  );
}
