import React from 'react'
import MeteorCell from './MeteorCell'

export default class MeteorRow extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="meteor-row">
        {Object.keys(this.props.meteor).map((attr, i) => (
          <MeteorCell
            key={i}
            attribute={attr}
            value={this.props.meteor[attr]}
          />
        ))}
      </div>
    )
  }
}

MeteorRow.propTypes = {
  meteor : React.PropTypes.object.isRequired
}
