import './App.css'
import { useMemo, useState } from 'react'
import { CounterPanel } from './components/CounterPanel.jsx'
import { TaskFilters } from './components/TaskFilters.jsx'
import { TaskList } from './components/TaskList.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [query, setQuery] = useState('')
  const [showDone, setShowDone] = useState(true)

  const [tasks, setTasks] = useState(() => [
    { id: 't1', title: 'Install React DevTools', done: true },
    { id: 't2', title: 'Inspect component tree', done: false },
    { id: 't3', title: 'Fix missing props bug', done: false },
    { id: 't4', title: 'Verify app works', done: false },
  ])

  const visibleTasks = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return tasks.filter((t) => {
      const matchesQuery = normalized.length === 0 || t.title.toLowerCase().includes(normalized)
      const matchesDone = showDone ? true : !t.done
      return matchesQuery && matchesDone
    })
  }, [tasks, query, showDone])

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function addTask(title) {
    const trimmed = title.trim()
    if (trimmed.length === 0) return
    setTasks((prev) => [{ id: crypto.randomUUID(), title: trimmed, done: false }, ...prev])
  }

  return (
    <>
      <div className="page">
        <header className="header">
          <div>
            <div className="eyebrow">Debugging lab</div>
            <h1 className="title">Task Dashboard</h1>
            <p className="subtitle">A small app for practicing React DevTools (state + props).</p>
          </div>
          <CounterPanel count={count} setCount={setCount} />
        </header>

        <main className="content">
          <section className="card">
            <h2 className="cardTitle">Filters</h2>
            <TaskFilters query={query} setQuery={setQuery} showDone={showDone} setShowDone={setShowDone} />
          </section>

          <section className="card">
            <h2 className="cardTitle">Tasks</h2>
            <TaskList
              items={visibleTasks}
              onToggleTask={toggleTask}
              onAddTask={addTask}
            />
          </section>
        </main>
      </div>
    </>
  )
}

export default App
