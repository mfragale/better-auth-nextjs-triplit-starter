"use client"

import { useQuery } from "@triplit/react"
import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { triplit } from "@/triplit/client"
import Todo from "./todo"

function useTodos() {
    const todosQuery = triplit.query("todos").Order("createdAt", "DESC")
    const { results: todos, error } = useQuery(triplit, todosQuery)
    return { todos, error }
}

export default function App() {
    const [text, setText] = useState("")
    const { todos } = useTodos()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await triplit.insert("todos", { text })
        setText("")
    }

    return (
        <div className="container mx-auto flex flex-col gap-2 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    type="text"
                    placeholder="What needs to be done?"
                    className="todo-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <Button type="submit" disabled={!text}>
                    Add Todo
                </Button>
            </form>

            <div>
                {todos?.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    )
}
