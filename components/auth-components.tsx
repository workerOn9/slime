import { signIn, signOut } from "@/auth";
import { Button } from "./ui/button";

export function SignIn({
    provider,
    ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return <form
        action={async () => {
            "use server"
            await signIn(provider)
        }}
    >
        <Button {...props}>登入</Button>
    </form>
}

export function SignOut({
    provider,
    ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
    return <form
        action={async () => {
            "use server"
            await signOut()
        }}
        className="w-full"
    >
        <Button {...props}>登出</Button>
    </form>
}