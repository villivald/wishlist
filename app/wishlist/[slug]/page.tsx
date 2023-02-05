import SingleWishlist from "@/components/singlePublicWishlist";

export default function Page({ params }: { params: { slug: string } }) {
  return <SingleWishlist slug={params.slug} />;
}
