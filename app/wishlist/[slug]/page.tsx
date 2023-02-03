import WishListPage from "@/components/wishListPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <WishListPage slug={params.slug} />;
}
