import { HttpClient } from "@triplit/client"
import { schema } from "./schema"

export const httpClient = new HttpClient({
    schema,
    serverUrl: process.env.NEXT_PUBLIC_TRIPLIT_DB_URL,
    token: process.env.TRIPLIT_SERVICE_TOKEN
})
