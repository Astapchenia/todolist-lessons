import {useState} from "react"
import {FilterValuesType} from "./App"
import {Button} from "./Button"
import {Task} from "./Task"

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

    const [taskInput, setTaskInput] = useState("")

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
        createTask(taskInput)
        setTaskInput("")
    }

    const isTaskInputValid = taskInput && taskInput.length <= 10

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && isTaskInputValid) {
                            createTaskHandler()
                        }
                    }
                    }
                />
                <Button
                    title="add"
                    onClick={createTaskHandler}
                    disabled={!isTaskInputValid}
                />
            </div>
            {!taskInput && <div>Max title length is 10 charters</div>}
            {taskInput.length > 10 && <div style={{color: "red"}}>Max title length is 10 charters</div>}
            {isTaskInputValid && <div>Your title length is {taskInput.length} charters</div>}
            {tasksList}
            <div>
                <Button title="All" onClick={() => changeTodolistFilter("all")}/>
                <Button title="Active" onClick={() => changeTodolistFilter("active")}/>
                <Button title="Completed" onClick={() => changeTodolistFilter("completed")}/>
            </div>
        </div>
    )
}