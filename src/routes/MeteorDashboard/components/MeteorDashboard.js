import React from 'react'

import './MeteorDashboard.scss'

export const MeteorDashboard = (props) => {
  const handleChangeValue = (event) => props.changeValue(event.target.value)
  const handleAddMeteor = (event) => props.addMeteor(props.value)
  let addMeteorClasses = "btn btn-primary add-meteor"

  if (!props.value) addMeteorClasses += " disabled"

  return (
    <div className="meteor-dashboard">
      <h5>Welcome To</h5>
      <h3>The Meteor Dashboard</h3>
      <br/>
      <div className="form-inline">
        <input
          type="text"
          className="meteor-value form-control"
          placeholder="Meteor Name"
          value={props.value}
          onChange={handleChangeValue}
        />
        <button
          className={addMeteorClasses}
          onClick={handleAddMeteor}
        >
          Add Meteor
        </button>
      </div>
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
