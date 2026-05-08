import PropTypes from 'prop-types'

export function TaskFilters({ query, setQuery, showDone, setShowDone }) {
  return (
    <div className="filters">
      <label className="field">
        <div className="fieldLabel">Search</div>
        <input
          className="input"
          value={query}
          placeholder="Try typing “props”"
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <label className="checkboxRow">
        <input
          type="checkbox"
          checked={showDone}
          onChange={(e) => setShowDone(e.target.checked)}
        />
        <span>Show completed</span>
      </label>
    </div>
  )
}

TaskFilters.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  showDone: PropTypes.bool.isRequired,
  setShowDone: PropTypes.func.isRequired,
}

