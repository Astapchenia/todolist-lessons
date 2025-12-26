import {Button} from "./Button"
import {TaskType} from "./TodolistItem"

type Props = {
    id: TaskType["id"]
    title: string
    isDone: boolean
    deleteTask: (taskId: TaskType["id"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: boolean) => void
    className: string
}

export const Task = ({id, title, isDone, deleteTask, changeTaskStatus, className}: Props) => {

    return (
        <li>
            <input
                type="checkbox"
                checked={isDone}
                onChange={(e) => changeTaskStatus(id, e.currentTarget.checked)}
            />
            <span className={className}>{title}</span>
            <Button title="x" onClick={() => deleteTask(id)}/>
        </li>
    )
}