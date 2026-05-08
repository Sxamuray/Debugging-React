## Debugging report (React DevTools)

### Setup

- **Project**: `react-debug/` (Vite + React)
- **Start**:
  - `npm install`
  - `npm run dev`
- **Open app**: Vite prints the local URL (for me it was `http://localhost:5174/` after a restart).
- **Tools**: React Developer Tools (browser extension).

### What I inspected in React DevTools

- **Components tree**: verified the parent/child relationships:
  - `App`
    - `CounterPanel`
    - `TaskFilters`
    - `TaskList`
- **Props**: checked each child component’s props in the right-side DevTools panel.
- **Hooks / State**: checked `useState` values in `App` (tasks list, search query, “show completed”).

### Issue 1 — Task list crash / missing tasks (props mismatch)

- **Symptom in the app**: the task list was failing to render (tasks were missing and a runtime error occurred).
- **DevTools clue**: selecting `TaskList` showed **`items` was `undefined`** even though the parent clearly had a tasks array.
- **Root cause in code**: `TaskList` was written to accept an `items` prop, but `App` was passing the prop as `tasks`.
- **Fix**: pass the correct prop name.
  - Updated `App.jsx` to pass `items={visibleTasks}`.

### Issue 2 — “+2” button only increments by 1 (stale state update)

- **Symptom in the app**: clicking **+2** only increased the counter by **1**.
- **DevTools clue**: in `CounterPanel`, the `count` prop updated by 1 per click even though the handler was called once.
- **Root cause in code**: the handler used the *current render value* twice:
  - `setCount(count + 1)` followed by `setCount(count + 1)`
  - React batches updates, so both writes used the same stale `count`.
- **Fix**: use functional state updates:
  - `setCount((c) => c + 1)` twice.

### Verification

- **Manual checks**
  - Task list renders tasks, can toggle done/undone, and can add a new task.
  - Search filter and “show completed” filter behave as expected.
  - “+2” increases by 2; “-1” decreases by 1.
- **Build check**
  - `npm run build` succeeds (no compile errors).

