import React from 'react'
import { bindActionCreators } from 'redux'
import MeteorHeader from 'routes/MeteorDashboard/components/MeteorHeader'
import 'shames/string'
import { shallow } from 'enzyme'

describe('(Component) MeteorHeader', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = { value: "name" }
    _wrapper = shallow(<MeteorHeader {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.eq(true)
  })

  it('Should render with the correct className.',() => {
    expect(_wrapper.hasClass('meteor-header')).to.eq(true)
  })

  it('Should render with the correct dynamic text.', () => {
    expect(_wrapper.text()).to.match(/Name/)
  })
})
