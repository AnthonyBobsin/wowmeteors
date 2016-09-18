import React from 'react'
import MeteorHeader from './MeteorHeader'

export default class MeteorHeaders extends React.Component {
  render () {
    return (
      <div className="meteor-headers">
        {this.props.headers.map((header, i) => (
          <MeteorHeader
            key={i}
            value={header}/>
        ))}
      </div>
    )
  }
}
