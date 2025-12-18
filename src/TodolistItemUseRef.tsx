import { useRef } from "react"
import { FilterValuesType } from "./App"
import { Button } from "./Button"
import { Task } from "./Task"

type Props = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: TaskType["id"]) => void
    createTask: (title: TaskType["title"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
    title,
    tasks,
    deleteTask,
    createTask,
    changeTodolistFilter
}: Props) => {

    const taskInputRef = useRef<HTMLInputElement>(null)
    console.log(taskInputRef);


    const tasksList = tasks.length === 0
        ? <span>Craete your first task</span>
        : <ul>
            {
                tasks.map(task => <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    isDone={task.isDone}
                    deleteTask={deleteTask}
                />)
            }
        </ul>

    const createTaskHandler = () => {
        if (taskInputRef.current) {
            createTask(taskInputRef.current.value)
            taskInputRef.current.value = ""
        }
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input ref={taskInputRef} />
                <Button title="add" onClick={createTaskHandler} />
            </div>
            {tasksList}
            <div>
                <Button title="All" onClick={() => changeTodolistFilter("all")} />
                <Button title="Active" onClick={() => changeTodolistFilter("active")} />
                <Button title="Completed" onClick={() => changeTodolistFilter("completed")} />
            </div>
        </div>
    )
}