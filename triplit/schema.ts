import { or, Schema as S } from "@triplit/client"
import { authSchema } from "./auth-schema"

const isUid = ["userId", "=", "$token.sub"] as const

/**
 * Define your schema here. After:
 * - Pass your schema to your Triplit client
 * - Push your schema to your Triplit server with 'triplit schema push'
 *
 * For more information about schemas, see the docs: https://www.triplit.dev/docs/schemas
 */
export const schema = S.Collections({
    ...authSchema,
    todos: {
        schema: S.Schema({
            id: S.Id(),
            text: S.String(),
            completed: S.Boolean({ default: false }),
            createdAt: S.Date({ default: S.Default.now() }),
            updatedAt: S.Date({ default: S.Default.now() })
        })
    },
    applications: {
        schema: S.Schema({
            id: S.Id(),
            name: S.String(),
            image: S.Optional(S.String()),
            url: S.Optional(S.String()),
            locales: S.Set(S.String()),
            defaultLocale: S.String(),
            userId: S.Optional(S.String()),
            organizationId: S.Optional(S.String()),
            archived: S.Boolean(),
            createdAt: S.Date({ default: S.Default.now() }),
            updatedAt: S.Date({ default: S.Default.now() })
        }),
        relationships: {
            user: S.RelationById("users", "$userId"),
            organization: S.RelationById("organizations", "$organizationId")
        },
        permissions: {
            authenticated: {
                read: {
                    filter: [or([isUid, ["organization.members.userId", "=", "$token.sub"]])]
                },
                insert: {
                    filter: [or([isUid, ["organization.members.userId", "=", "$token.sub"]])]
                },
                update: {
                    filter: [or([isUid, ["organization.members.userId", "=", "$token.sub"]])]
                },
                postUpdate: {
                    filter: [or([isUid, ["organization.members.userId", "=", "$token.sub"]])]
                }
            }
        }
    },
    translations: {
        schema: S.Schema({
            id: S.Id(),
            key: S.String(),
            message: S.String(),
            context: S.Optional(S.String()),
            locale: S.String(),
            applicationId: S.String(),
            createdAt: S.Date({ default: S.Default.now() }),
            updatedAt: S.Date({ default: S.Default.now() })
        }),
        relationships: {
            application: S.RelationById("applications", "$applicationId")
        },
        permissions: {
            authenticated: {
                read: {
                    filter: [
                        or([
                            ["application.userId", "=", "$token.sub"],
                            ["application.organization.members.userId", "=", "$token.sub"]
                        ])
                    ]
                },
                insert: {
                    filter: [
                        or([
                            ["application.userId", "=", "$token.sub"],
                            ["application.organization.members.userId", "=", "$token.sub"]
                        ])
                    ]
                },
                update: {
                    filter: [
                        or([
                            ["application.userId", "=", "$token.sub"],
                            ["application.organization.members.userId", "=", "$token.sub"]
                        ])
                    ]
                },
                postUpdate: {
                    filter: [
                        or([
                            ["application.userId", "=", "$token.sub"],
                            ["application.organization.members.userId", "=", "$token.sub"]
                        ]),
                        ["updatedAt", ">", "createdAt"]
                    ]
                },
                delete: {
                    filter: [
                        or([
                            ["application.userId", "=", "$token.sub"],
                            ["application.organization.members.userId", "=", "$token.sub"]
                        ])
                    ]
                }
            }
        }
    }
})
