import {Button} from "./Button"

type Props = {
    title: string
    isDone: boolean
    deleteTask: () => void
    changeTaskStatus: () => void
    className: string
}

export const Task = ({title, isDone, deleteTask, changeTaskStatus, className}: Props) => {

    return (
        <li>
            <input
                type="checkbox"
                checked={isDone}
                onChange={changeTaskStatus}
            />
            <span className={className}>{title}</span>
            <Button title="x" onClick={deleteTask}/>
        </li>
    )
}