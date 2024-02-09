import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Fontproof by Unforma Club</title>
                <link
                    rel="preload"
                    type="font/ttf"
                    as="font"
                    href="https://font.unforma.club/files/Olig-Bold.ttf"
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
