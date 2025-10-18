import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
     <Head>
        <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Readex+Pro:wght@160..700&family=Wix+Madefor+Text:ital,wght@0,400..800;1,400..800&display=swap"
            rel="stylesheet"
          />
           <title>Carys Wedding - Wedding Management Services in TamilNadu</title>
           <link rel="icon" href="/favicon.ico" />
           <meta name="description" content="Carys Wedding is a professional wedding management company offering planning, decoration, and coordination services." />

        </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
