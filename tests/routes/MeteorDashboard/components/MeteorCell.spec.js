import React from 'react'
import { bindActionCreators } from 'redux'
import MeteorCell from 'routes/MeteorDashboard/components/MeteorCell'
import 'shames/string'
import { shallow } from 'enzyme'


describe('(Component) MeteorCell', () => {
  let _props, _wrapper

  beforeEach(() => {
    _props = { attribute: "name", value: "Aachen" }
    _wrapper = shallow(<MeteorCell {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.eq(true)
  })

  it('Should render with the correct dynamic className.', () => {
    expect(_wrapper.hasClass('meteor-name')).to.eq(true)
  })

  it('Should render with the correct dynamic text.', () => {
    expect(_wrapper.text()).to.match(/Aachen/)
  })
})
