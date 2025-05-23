import { triplitAdapter } from "@daveyplate/better-auth-triplit"
import { betterAuth } from "better-auth"
import { organization } from "better-auth/plugins"

import { httpClient } from "@/triplit/http-client"

export const auth = betterAuth({
    database: triplitAdapter({
        httpClient,
        debugLogs: true
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [organization()]
})
