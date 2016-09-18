import React from 'react'
import { bindActionCreators } from 'redux'
import MeteorHeader from 'routes/MeteorDashboard/components/MeteorHeader'
import MeteorHeaders from 'routes/MeteorDashboard/components/MeteorHeaders'
import { shallow } from 'enzyme'

describe('(Component) MeteorHeaders', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = { headers:  ["some header"] }
    _wrapper = shallow(<MeteorHeaders {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.eq(true)
  })

  it('Should render a MeteorHeader for every item in the "headers" prop.', () => {
    const meteorHeaders = _wrapper.find(MeteorHeader)
    expect(meteorHeaders).to.have.length(1)
  })

  describe('MeteorHeader items...', () => {
    let _meteorHeader

    beforeEach(() => {
      _meteorHeader = _wrapper.find(MeteorHeader)
    })

    it('Should receive the correct "value" prop.', () => {
      expect(_meteorHeader.props().value).to.eq("some header")
    })
  })
})
