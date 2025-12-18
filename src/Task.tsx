import { Button } from "./Button"
import { TaskType } from "./TodolistItem"

type Props = {
    id: TaskType["id"]
    title: string
    isDone: boolean
    deleteTask: (taskId: TaskType["id"]) => void
}

export const Task = ({ id, title, isDone, deleteTask }: Props) => {

    return (
        <li>
            <input type="checkbox" checked={isDone} />
            <span>{title}</span>
            <Button title="x" onClick={() => deleteTask(id)} />
        </li>
    )
}