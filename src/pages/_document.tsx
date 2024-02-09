import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Fontproof by Unforma Club</title>
                <link
                    rel="preload"
                    type="font/woff2"
                    as="font"
                    href="/fonts/Ordinal[slnt,wght].woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
