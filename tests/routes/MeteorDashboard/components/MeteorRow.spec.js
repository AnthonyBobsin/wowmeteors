import React from 'react'
import { bindActionCreators } from 'redux'
import MeteorCell from 'routes/MeteorDashboard/components/MeteorCell'
import MeteorRow from 'routes/MeteorDashboard/components/MeteorRow'
import { shallow } from 'enzyme'

describe('(Component) MeteorRow', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = { meteor: { name: "Aachen" } }
    _wrapper = shallow(<MeteorRow {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.eq(true)
  })

  it('Should render a MeteorCell for every attr within "meteor" prop.', () => {
    const meteorCell = _wrapper.find(MeteorCell)
    expect(meteorCell).to.have.length(1)
  })

  describe('MeteorCells...', () => {
    let _meteorCell

    beforeEach(() => {
      _meteorCell = _wrapper.find(MeteorCell)
    })

    it('Should receive the correct "attribute" and "value" props.', () => {
      expect(_meteorCell.props().attribute).to.eq("name")
      expect(_meteorCell.props().value).to.eq("Aachen")
    })
  })
})
