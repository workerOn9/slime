import {Metadata} from "next"

export const metadata: Metadata = {
    title: "Slime",
    description: "A Slime For Data Transforming",
    icons: "/logo.png"
}

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl font-bold">
                This is the home page.
            </h1>
        </main>
    );
}
