import {
  addMeteor,
  receiveMeteors
} from 'routes/MeteorDashboard/modules/actions'
import meteorDashboardReducer from 'routes/MeteorDashboard/modules/reducers'

describe('(Redux Reducer) MeteorDashboard', () => {
  it('Should be a function.', () => {
    expect(meteorDashboardReducer).to.be.a('function')
  })

  it('Should initialize with an empty "meteors" array property.', () => {
    let initialState = meteorDashboardReducer(undefined, {})

    expect(initialState).to.have.any.keys('meteors')
    expect(initialState.meteors).to.be.an('array')
    expect(initialState.meteors).to.be.empty
  })

  it('Should initial with an empty "value" string property.', () => {
    let initialState = meteorDashboardReducer(undefined, {})

    expect(initialState).to.have.any.keys('value')
    expect(initialState.value).to.be.a('string')
    expect(initialState.value).to.be.empty
  })

  describe('(Action Handler) ADD_METEOR', () => {
    it('Should add the action payload\'s "value" to the "meteors" state array.', () => {
      let state = meteorDashboardReducer(undefined, {})

      expect(state.meteors).to.be.empty
      state = meteorDashboardReducer(state, addMeteor(5))
      expect(state.meteors).to.have.members([5])
    })
  })

  describe('(Action Handler) RECEIVE_METEORS', () => {
    it('Should overwrite existing state "meteors" array with action payload\'s "meteors".', () => {
      let state = meteorDashboardReducer(undefined, {})

      expect(state.meteors).to.be.empty
      state = meteorDashboardReducer(state, receiveMeteors([1,2,3]))
      expect(state.meteors).to.have.members([1,2,3])
    })
  })
})
