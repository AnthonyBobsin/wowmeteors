import React from 'react'

const MeteorCell = (props) => (
  <div className={`meteor-${props.attribute.toDash()}`}>
    {props.value}
  </div>
)

export default MeteorCell
