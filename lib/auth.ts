import { triplitAdapter } from "@daveyplate/better-auth-triplit"
import { betterAuth } from "better-auth"

import { httpClient } from "@/triplit/http-client"

export const auth = betterAuth({
    database: triplitAdapter({
        httpClient,
        debugLogs: false
    }),
    emailAndPassword: {
        enabled: true
    }
})
