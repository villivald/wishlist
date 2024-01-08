import SingleWishlist from "@/components/singlePublicWishlist";
import { metadataElement } from "@/components/metadata";

export const metadata = metadataElement({
  title: "Public Wishlist",
});

export default function Page({ params }: { params: { slug: string } }) {
  return <SingleWishlist slug={params.slug} />;
}
