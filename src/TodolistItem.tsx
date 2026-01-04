import {useState} from "react"
import {FilterValuesType, TodolistType} from "./App"
import {Button} from "./Button"
import {Task} from "./Task"

type Props = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    deleteTask: (taskId: TaskType["id"], todolistId: TodolistType["id"]) => void
    createTask: (title: TaskType["title"], todolistId: TodolistType["id"]) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: TodolistType["id"]) => void
    changeTaskStatus: (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => void
    deleteTodolist: (todolistId: TodolistType["id"]) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistItem = ({
                                 id,
                                 title,
                                 tasks,
                                 filter,
                                 deleteTask,
                                 createTask,
                                 changeTodolistFilter,
                                 changeTaskStatus,
                                 deleteTodolist
                             }: Props) => {

    const [taskInput, setTaskInput] = useState("")
    const [error, setError] = useState(false)

    const tasksList = tasks.length === 0
        ? <span>Craete your first task</span>
        : <ul>
            {
                tasks.map(task => {

                    const changeTaskStatusHandler = () => {
                        changeTaskStatus(task.id, !task.isDone, id)
                    }

                    const deleteTaskHandler = () => deleteTask(task.id, id)

                    return (
                    <Task
                    key={task.id}
                    title={task.title}
                    isDone={task.isDone}
                    deleteTask={deleteTaskHandler}
                    changeTaskStatus={changeTaskStatusHandler}
                    className={task.isDone ? "task-done" : "task"}
                />)})
            }
        </ul>

    const createTaskHandler = () => {
        const trimmedTitle = taskInput.trim()
        if(trimmedTitle){
            createTask(trimmedTitle, id)
        } else {
            setError(true)
        }
        setTaskInput("")
    }

    const isTaskInputValid = taskInput && taskInput.length <= 10

    return (
        <div>
            <h3>
                {title}
                <Button title="x" onClick={() => deleteTodolist(id)} />
            </h3>
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
                    onClick={() => changeTodolistFilter("all", id)}
                    className={filter === "all" ? "filter-btn-active" : ""}
                />
                <Button
                    title="Active"
                    onClick={() => changeTodolistFilter("active", id)}
                    className={filter === "active" ? "filter-btn-active" : ""}

                />
                <Button
                    title="Completed"
                    onClick={() => changeTodolistFilter("completed", id)}
                    className={filter === "completed" ? "filter-btn-active" : ""}
                />
            </div>
        </div>
    )
}