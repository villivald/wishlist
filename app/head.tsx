export default function Head() {
  const title = "Wishlist";

  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
