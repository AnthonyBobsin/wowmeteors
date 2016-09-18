import React from 'react'

const MeteorHeader = (props) => (
  <div className="meteor-header">
    {props.value.toTitleCase()}
  </div>
)

export default MeteorHeader
