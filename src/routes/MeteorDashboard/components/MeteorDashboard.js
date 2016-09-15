import React from 'react'

export const MeteorDashboard = (props) => {
  const handleChangeValue = (event) => props.changeValue(event.target.value)
  const handleAddMeteor = (event) => props.addMeteor(props.value)

  return (
    <div>
      <input type="text" value={props.value} onChange={handleChangeValue}/>
      <button onClick={handleAddMeteor}>
        Click me!
      </button>
      <div>
        {props.meteors.map((meteor, i) => (
          <div key={i}>{meteor}</div>
        ))}
      </div>
    </div>
  )
}

MeteorDashboard.propTypes = {
  value       : React.PropTypes.string.isRequired,
  addMeteor   : React.PropTypes.func.isRequired,
  changeValue : React.PropTypes.func.isRequired
}

export default MeteorDashboard
