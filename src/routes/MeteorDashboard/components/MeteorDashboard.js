import React from 'react'

import MeteorHeaders from './MeteorHeaders'
import MeteorRow from './MeteorRow'
import './MeteorDashboard.scss'

export default class MeteorDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: "" }
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleAddMeteor = this.handleAddMeteor.bind(this)
    this.getMeteorHeaders = this.getMeteorHeaders.bind(this)
  }

  componentDidMount () {
    this.props.fetchMeteors()
  }

  handleChangeValue (event) {
    this.setState({ value: event.target.value })
  }

  handleAddMeteor (event) {
    if (this.state.value) this.props.addMeteor(this.state.value)
  }

  getMeteorHeaders () {
    return (
      this.props.meteors[0] && Object.keys(this.props.meteors[0])
    ) || []
  }

  render () {
    let addMeteorClasses = "btn btn-primary add-meteor"
    if (!this.state.value) addMeteorClasses += " disabled"

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
            value={this.state.value}
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
          <MeteorHeaders
            {...this.props}
            headers={this.getMeteorHeaders()}
          />
          {this.props.meteors.map((meteor, i) => (
            <MeteorRow key={i} meteor={meteor} />
          ))}
        </div>
      </div>
    )
  }
}

MeteorDashboard.propTypes = {
  addMeteor   : React.PropTypes.func.isRequired,
  changeValue : React.PropTypes.func.isRequired
}
