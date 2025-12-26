import {useState} from "react"
import {FilterValuesType} from "./App"
import {Button} from "./Button"
import {Task} from "./Task"

type Props = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"]) => void
    createTask: (title: TaskType["title"]) => void
    changeTodolistFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"]) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 title,
                                 tasks,
                                 filter,
                                 deleteTask,
                                 createTask,
                                 changeTodolistFilter,
                                 changeTaskStatus
                             }: Props) => {

    const [taskInput, setTaskInput] = useState("")
    const [error, setError] = useState(false)

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
                    changeTaskStatus={changeTaskStatus}
                    className={task.isDone ? "task-done" : "task"}
                />)
            }
        </ul>

    const createTaskHandler = () => {
        const trimmedTitle = taskInput.trim()
        if(trimmedTitle){
            createTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskInput("")
    }

    const isTaskInputValid = taskInput && taskInput.length <= 10

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskInput}
                    onChange={(e) => {
                        error && setError(false)
                        setTaskInput(e.currentTarget.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && isTaskInputValid) {
                            createTaskHandler()
                        }
                    }}
                    className={error ? "error" : ""}
                />
                <Button
                    title="add"
                    onClick={createTaskHandler}
                    disabled={!isTaskInputValid}
                />
            </div>
            {!error && !taskInput && <div>Max title length is 10 charters</div>}
            {taskInput.length > 10 && <div style={{color: "red"}}>Max title length is 10 charters</div>}
            {isTaskInputValid && <div>Your title length is {taskInput.length} charters</div>}
            {error && <div style = {{color: "red"}}>Enter valid title</div>}
            {tasksList}
            <div>
                <Button
                    title="All"
                    onClick={() => changeTodolistFilter("all")}
                    className={filter === "all" ? "filter-btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodolistFilter("active")}
                    className={filter === "active" ? "filter-btn-active" : ""}

                />
                <Button
                    title="Completed"
                    onClick={() => changeTodolistFilter("completed")}
                    className={filter === "completed" ? "filter-btn-active" : ""}
                />
            </div>
        </div>
    )
}