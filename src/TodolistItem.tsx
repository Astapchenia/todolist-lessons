import {FilterValuesType, TodolistType} from "./App"
import {Button} from "./Button"
import {Task} from "./Task"
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

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
    changeTodolistTitle: (title: TodolistType["title"], todolistId: TodolistType["id"]) => void
    changeTaskTitle: (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => void
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
                                 deleteTodolist,
                                 changeTodolistTitle,
                                 changeTaskTitle
                             }: Props) => {

    const tasksList = tasks.length === 0
        ? <span>Craete your first task</span>
        : <ul>
            {
                tasks.map(task => {

                    const changeTaskStatusHandler = () => {
                        changeTaskStatus(task.id, !task.isDone, id)
                    }

                    const deleteTaskHandler = () => deleteTask(task.id, id)

                    const changeTaskTitleHandler = (newTitle: TaskType["title"])=> {
                        changeTaskTitle(task.id, newTitle, id)
                    }

                    return (
                    <Task
                    key={task.id}
                    title={task.title}
                    isDone={task.isDone}
                    deleteTask={deleteTaskHandler}
                    changeTaskStatus={changeTaskStatusHandler}
                    className={task.isDone ? "task-done" : "task"}
                    changeTaskTitle={changeTaskTitleHandler}
                />)})
            }
        </ul>

    const createTaskHandler = (title: TaskType["title"]) => {
            createTask(title, id)
    }

    const changeTodolistTitleHandler = (newTitle: TodolistType["title"]) => {
        changeTodolistTitle(newTitle, id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                <Button title="x" onClick={() => deleteTodolist(id)} />
            </h3>
            <CreateItemForm createItem={createTaskHandler} />
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