import { auth } from "@/auth"
import { SignIn, SignOut } from "@/components/auth-components"

export default async function Page() {
    const session = await auth()
    if (!session?.user) return <SignIn />
    return (
        <div className='flex min-h-screen flex-col items-center p-24 gap-1'>
            <span className="text-sm sm:inline-text">
                token: {(session as any).sessionToken ?? "未知"}
            </span>
            <SignOut />
        </div>
    )
}