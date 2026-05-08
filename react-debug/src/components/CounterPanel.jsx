import PropTypes from 'prop-types'

export function CounterPanel({ count, setCount }) {
  function incrementTwice() {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div className="counterPanel">
      <div className="counterLabel">Clicks</div>
      <div className="counterValue">{count}</div>
      <div className="counterActions">
        <button type="button" className="btn" onClick={() => setCount((c) => c - 1)}>
          -1
        </button>
        <button type="button" className="btnPrimary" onClick={incrementTwice}>
          +2
        </button>
      </div>
    </div>
  )
}

CounterPanel.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
}

