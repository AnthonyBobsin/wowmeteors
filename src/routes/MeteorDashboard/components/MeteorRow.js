import React from 'react'

export class MeteorRow extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="meteor-row">
        <div>{this.props.name}</div>
      </div>
    )
  }
}
