import {useState} from "react"
import "./App.css"
import {TaskType, TodolistItem} from "./TodolistItem"
import {getFilteredTasks} from "./utils"
import {v1} from "uuid"
import {CreateItemForm} from "./CreateItemForm.tsx";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

// Create +
// Read +
// Update +
// Delete +

// CRUD =>  CLI, GUI, VUI,

function App() {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "active"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS & TS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Whiskey", isDone: true},
            {id: v1(), title: "Champain", isDone: false},
            {id: v1(), title: "Wine", isDone: false},
        ]
    })


    // BLL (CRUD )
// CRUD for tasks
    const deleteTask = (taskId: TaskType["id"], todolistId: TodolistType["id"]) => {
        // 1. Create next state (immutable)
        const todolistTasks = tasks[todolistId]
        const nextTodolistTasks: TaskType[] = todolistTasks.filter(t => t.id !== taskId)
        const nextState = {...tasks, [todolistId]: nextTodolistTasks}
        // 2. Set next state
        setTasks(nextState)
    }

    const createTask = (title: TaskType["title"], todolistId: TodolistType["id"]) => {
        // 1. Create next state (immutable)
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const todolistTasks = tasks[todolistId]
        const nextTodolistTasks: TaskType[] = [...todolistTasks, newTask]
        const nextState: TasksStateType = {...tasks, [todolistId]: nextTodolistTasks}
        // 2. Set next state
        setTasks(nextState)

        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"], todolistId: TodolistType["id"]) => {
        const todolistTasks = tasks[todolistId]
        const nextTodolistTasks: TaskType[] = todolistTasks.map(t => t.id === taskId ? {...t, isDone} : t)
        const nextState: TasksStateType = {...tasks,[todolistId]: nextTodolistTasks}
        setTasks(nextState)

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const changeTaskTitle = (taskId: TaskType["id"], title: TaskType["title"], todolistId: TodolistType["id"]) => {
        const todolistTasks = tasks[todolistId]
        const nextTodolistTasks: TaskType[] = todolistTasks.map(t => t.id === taskId ? {...t, title} : t)
        const nextState: TasksStateType = {...tasks,[todolistId]: nextTodolistTasks}
        setTasks(nextState)

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)})
    }

// CRUD for todolists
    const changeTodolistFilter = (filter: FilterValuesType, todolistId: TodolistType["id"]) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const changeTodolistTitle = (title: TodolistType["title"], todolistId: TodolistType["id"]) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const deleteTodolist = (todolistId: TodolistType["id"])=> {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasksState = {...tasks}
        delete copyTasksState[todolistId]
        setTasks(copyTasksState)
    }

    const createTodolist = (title: TodolistType["title"]) => {
        const newTodolistId = v1();
        const newTodolist: TodolistType = {
            id: newTodolistId,
            title,
            filter: "all"
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const todolistsComponents = todolists.map(tl => {
        return (
            <TodolistItem
                key={tl.id}
                id={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                deleteTask={deleteTask}
                createTask={createTask}
                changeTodolistFilter={changeTodolistFilter}
                changeTaskStatus={changeTaskStatus}
                deleteTodolist={deleteTodolist}
                changeTodolistTitle={changeTodolistTitle}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    // UI


    return (
        <div className="app">
            <CreateItemForm createItem={createTodolist} />
            {todolistsComponents}
        </div>
    )
}

export default App
