import React from 'react'

export default class MeteorRow extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="meteor-row">
        <div className="meteor-nasa-id">
          {this.props.nasaId}
        </div>
        <div className="meteor-name">
          {this.props.name}
        </div>
        <div className="meteor-name-type">
          {this.props.nameType}
        </div>
        <div className="meteor-class">
          {this.props.class}
        </div>
        <div className="meteor-fall">
          {this.props.fall}
        </div>
        <div className="meteor-mass-g">
          {this.props.massG}
        </div>
        <div className="meteor-date">
          {this.props.date}
        </div>
        <div className="meteor-lat">
          {this.props.lat}
        </div>
        <div className="meteor-long">
          {this.props.long}
        </div>
      </div>
    )
  }
}

MeteorRow.propTypes = {
  name : React.PropTypes.string.isRequired
}
