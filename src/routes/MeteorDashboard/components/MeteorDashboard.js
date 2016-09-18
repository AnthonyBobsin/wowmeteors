import React from 'react'

import MeteorHeaders from './MeteorHeaders'
import MeteorRow from './MeteorRow'
import './MeteorDashboard.scss'

export default class MeteorDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleAddMeteor = this.handleAddMeteor.bind(this)
  }

  componentDidMount () {
    this.props.fetchMeteors()
  }

  handleChangeValue (event) {
    this.props.changeValue(event.target.value)
  }

  handleAddMeteor (event) {
    if (this.props.value) this.props.addMeteor(this.props.value)
  }

  render () {
    let addMeteorClasses = "btn btn-primary add-meteor"
    if (!this.props.value) addMeteorClasses += " disabled"

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
            value={this.props.value}
            onChange={this.handleChangeValue}
          />
          <button
            className={addMeteorClasses}
            onClick={this.handleAddMeteor}
          >
            Add Meteor
          </button>
        </div>
        <div className="meteor-rows">
          <MeteorHeaders {...this.props}/>
          {this.props.meteors.map((meteor, i) => (
            <MeteorRow key={i} meteor={meteor} />
          ))}
        </div>
      </div>
    )
  }
}

MeteorDashboard.propTypes = {
  value       : React.PropTypes.string.isRequired,
  addMeteor   : React.PropTypes.func.isRequired,
  changeValue : React.PropTypes.func.isRequired
}
