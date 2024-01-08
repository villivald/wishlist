import type { Metadata } from "next";

export const metadataElement = ({ title }: { title: string }): Metadata => {
  return {
    title: `Wishlist App | ${title}`,
    description: "Home page of the Wishlist App",
  };
};
