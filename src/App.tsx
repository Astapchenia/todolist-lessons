import { useState } from 'react'
import './App.css'
import { TaskType, TodolistItem } from './TodolistItem'
import { getFilteredTasks } from './utils'
import { v1 } from 'uuid'

export type FilterValuesType = "all" | "active" | "completed"

// Create +
// Read +
// Update +
// Delete +

// CRUD =>  CLI, GUI, VUI,

function App() {
  console.log(typeof v1());
  
  // BLL (CRUD )
  const [tasks, setTasks] = useState<TaskType[]>(
    [
      { id: v1(), title: "HTML & CSS", isDone: true },
      { id: v1(), title: "JS & TS", isDone: true },
      { id: v1(), title: "REACT", isDone: false },
      { id: v1(), title: "REDUX", isDone: false },
    ]
  )

  const deleteTask = (taskId: TaskType["id"]) => {
    // 1. Create next state (immutable) 
    const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
    // 2. Set next state
    setTasks(nextState)
  }

  const createTask = (title: TaskType["title"]) => {
    // 1. Create next state (immutable)
    const newTask: TaskType = {
        id: v1(),
        title,
        isDone: false
    }
    const nextState: TaskType[] = [...tasks, newTask]
    // 2. Set next state
    setTasks(nextState)
  }

  const changeTaskStatus = (taskId: TaskType["id"], isDone: TaskType["isDone"]) => {
      const nextState: TaskType[] = tasks.map(t => t.id === taskId ? {...t, isDone}: t)
      setTasks(nextState)

  }

  // UI

  const [filter, setFilter] = useState<FilterValuesType>("all")

  const changeTodolistFilter = (filter: FilterValuesType) => setFilter(filter)


  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        filter={filter}
        tasks={getFilteredTasks(tasks, filter)}
        deleteTask={deleteTask}
        createTask={createTask}
        changeTodolistFilter={changeTodolistFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  )
}

export default App
