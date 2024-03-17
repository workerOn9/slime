import NextHead from "next/head"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <NextHead>
                <title>Slime</title>
                <meta key="title" content="A Slime For Data Transforming" property="og:title"/>
                <meta
                    key="viewport"
                    content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                    name="viewport"
                />
                <link href="/logo.png" rel="icon"/>
            </NextHead>
            <h1 className="text-3xl font-bold">
                This is the home page.
            </h1>
        </main>
    );
}
