import React from 'react'
import { bindActionCreators} from 'redux'
import { MeteorRow } from 'routes/MeteorDashboard/components/MeteorRow'
import { MeteorDashboard} from 'routes/MeteorDashboard/components/MeteorDashboard'
import { shallow } from 'enzyme'

describe('(Component) MeteorDashboard', () => {
  let _props, _spies, _wrapper

  beforeEach(() => {
    _spies = {}
    _props = {
      meteors : [
        { name : "one" },
        { name : "two" }
      ],
      value   : "Some Meteor",
      ...bindActionCreators({
        addMeteor    : (_spies.addMeteor = sinon.spy()),
        fetchMeteors : (_spies.fetchMeteors = sinon.spy()),
        changeValue  : (_spies.changeValue = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<MeteorDashboard {..._props} />)
  })

  it('Should render as a <div>.', () => {
    expect(_wrapper.is('div')).to.eq(true)
  })

  it('Should render with an <h5> that includes Welcome To text.', () => {
    expect(_wrapper.find('h5').text()).to.match(/Welcome To/)
  })

  it('Should render with an <h3> that includes The Meteor Dashboard text.', () => {
    expect(_wrapper.find('h3').text()).to.match(/The Meteor Dashboard/)
  })

  describe('An Add Meteor form\'s...', () => {
    let _form

    beforeEach(() => {
      _form = _wrapper.find('div.form-inline')
    })

    describe('Input field...', () => {
      let _input

      beforeEach(() => {
        _input = _form.find('input')
      })

      it('Should represent the "value" prop.', () => {
        expect(_input.props().value).to.eq("Some Meteor")

        _wrapper.setProps({ value: "Another Meteor" })
        // TODO: find out how to "refresh" our _input variable
        // without re-finding the specific DOM element.
        _input = _wrapper.find('input')
        expect(_input.props().value).to.eq("Another Meteor")
      })

      it('Should dispatch a `changeValue` action on change.', () => {
        expect(_input.props().value).to.eq("Some Meteor")

        _input.simulate('change', { target: { value: "Another Meteor" } })
        _spies.dispatch.should.have.been.called
        _spies.changeValue.should.have.been.called
      })
    })

    describe('Button...', () => {
      let _button

      beforeEach(() => {
        _button = _form.find('button')
      })

      it('Should render with the Add Meteor text.', () => {
        expect(_button.text()).to.match(/Add Meteor/)
      })

      it('Should dispatch an `addMeteor` action on click.', () => {
        _button.simulate('click')
        _spies.dispatch.should.have.been.called
        _spies.addMeteor.should.have.been.called
      })
    })
  })

  it('Should render two <MeteorRow /> components.', () => {
    expect(_wrapper.find(MeteorRow)).to.have.length(2)
  })
})
