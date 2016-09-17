import React from 'react'
import { bindActionCreators } from 'redux'
import MeteorRow from 'routes/MeteorDashboard/components/MeteorRow'
import { shallow } from 'enzyme'

describe('(Component) MeteorRow', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      nasaId   : 1,
      name     : "Aachen",
      nameType : "Valid",
      class    : "L5",
      fall     : "Fell",
      massG    : 21,
      date     : "1880-01-01",
      lat      : "50.775",
      long     : "6.083"
    }
    _wrapper = shallow(<MeteorRow {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.eq(true)
  })

  describe('Nasa ID...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-nasa-id')
    })

    it('Should render a <div> that represents the nasaId prop.', () => {
      expect(_nameDiv.text()).to.match(/1/)
    })
  })

  describe('Name...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-name')
    })

    it('Should render a <div> that represents the name prop.', () => {
      expect(_nameDiv.text()).to.match(/Aachen/)
    })
  })

  describe('Name type...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-name-type')
    })

    it('Should render a <div> that represents the nameType prop.', () => {
      expect(_nameDiv.text()).to.match(/Valid/)
    })
  })

  describe('Class...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-class')
    })

    it('Should render a <div> that represents the class prop.', () => {
      expect(_nameDiv.text()).to.match(/L5/)
    })
  })

  describe('Fall...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-fall')
    })

    it('Should render a <div> that represents the fall prop.', () => {
      expect(_nameDiv.text()).to.match(/Fell/)
    })
  })

  describe('Mass G...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-mass-g')
    })

    it('Should render a <div> that represents the massG prop.', () => {
      expect(_nameDiv.text()).to.match(/21/)
    })
  })

  describe('Date...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-date')
    })

    it('Should render a <div> that represents the date prop.', () => {
      expect(_nameDiv.text()).to.match(/1880-01-01/)
    })
  })

  describe('Latitude...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-lat')
    })

    it('Should render a <div> that represents the lat prop.', () => {
      expect(_nameDiv.text()).to.match(/50.775/)
    })
  })

  describe('Longitude...', () => {
    let _nameDiv

    beforeEach(() => {
      _nameDiv = _wrapper.find('.meteor-long')
    })

    it('Should render a <div> that represents the long prop.', () => {
      expect(_nameDiv.text()).to.match(/6.083/)
    })
  })
})
