import {Button} from "./Button"
import {EditableSpan} from "./EditableSpan.tsx";
import {TaskType} from "./TodolistItem.tsx";

type Props = {
    title: string
    isDone: boolean
    deleteTask: () => void
    changeTaskStatus: () => void
    className: string
    changeTaskTitle: (newTitle: TaskType["title"]) => void
}

export const Task = ({
                         title,
                         isDone,
                         deleteTask,
                         changeTaskStatus,
                         className,
                         changeTaskTitle
                     }: Props) => {


    return (
        <li>
            <input
                type="checkbox"
                checked={isDone}
                onChange={changeTaskStatus}
            />
            <EditableSpan title={title} className={className} changeTitle={changeTaskTitle}/>
            <Button title="x" onClick={deleteTask}/>
        </li>
    )
}