"use client"

import { toast } from "sonner"
import { useSession } from "@/hooks/auth-hooks"
import { useConditionalQuery } from "@/hooks/use-conditional-query"
import { useTriplitToken } from "@/hooks/use-triplit-token"
import { authClient } from "@/lib/auth-client"
import { triplit } from "@/triplit/client"
import { Button } from "./ui/button"

export function CreateOrganizationButton() {
    const { payload } = useTriplitToken()
    const { session, isPending } = useSession()
    useConditionalQuery(triplit, payload?.sub && triplit.query("applications"))

    return (
        <Button
            disabled={!session || isPending}
            onClick={async () => {
                await authClient.organization.create({
                    name: "My Organization",
                    slug: "my-organization",
                    fetchOptions: {
                        throw: true
                    }
                })

                toast.success("Organization created")
            }}
        >
            Create Organization
        </Button>
    )
}
