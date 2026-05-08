import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'

function TaskRow({ task, onToggle }) {
  return (
    <li className="taskRow">
      <label className={task.done ? 'task taskDone' : 'task'}>
        <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} />
        <span>{task.title}</span>
      </label>
    </li>
  )
}

TaskRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
}

export function TaskList({ items, onToggleTask, onAddTask }) {
  const [draft, setDraft] = useState('')

  const remainingCount = useMemo(() => {
    return items.filter((t) => !t.done).length
  }, [items])

  function submit(e) {
    e.preventDefault()
    onAddTask(draft)
    setDraft('')
  }

  return (
    <div>
      <form className="addRow" onSubmit={submit}>
        <input
          className="input"
          value={draft}
          placeholder="Add a task…"
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="btnPrimary">
          Add
        </button>
      </form>

      <div className="metaRow">
        <div className="pill">{remainingCount} remaining</div>
      </div>

      <ul className="taskList">
        {items.map((t) => (
          <TaskRow key={t.id} task={t} onToggle={onToggleTask} />
        ))}
      </ul>
    </div>
  )
}

TaskList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
}

