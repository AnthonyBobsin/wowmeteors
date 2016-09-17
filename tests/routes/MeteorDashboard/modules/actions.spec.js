import {
  ADD_METEOR,
  RECEIVE_METEORS,
  CHANGE_VALUE,
  addMeteor,
  receiveMeteors,
  fetchMeteors,
  changeValue
} from 'routes/MeteorDashboard/modules/actions'

import meteorDashboardReducer from 'routes/MeteorDashboard/modules/reducers'

describe('(Redux Action Creator) MeteorDashboard', () => {
  it('Should export a constant ADD_METEOR.', () => {
    expect(ADD_METEOR).to.equal('ADD_METEOR')
  })
  
  it('Should export a constant RECEIVE_METEORS.', () => {
    expect(RECEIVE_METEORS).to.equal('RECEIVE_METEORS')
  })
  
  it('Should export a constant CHANGE_VALUE.', () => {
    expect(CHANGE_VALUE).to.equal('CHANGE_VALUE')
  })
  
  describe('addMeteor', () => {
    it('Should be exported as a function.', () => {
      expect(addMeteor).to.be.a('function')
    })
    
    it('Should return an action with type "ADD_METEOR".', () => {
      expect(addMeteor()).to.have.property('type', ADD_METEOR)
    })
    
    it('Should assign the first argument to the "value" property.', () => {
      expect(addMeteor(5)).to.have.property('value', 5)
    })
  })
  
  describe('receiveMeteors', () => {
    it('Should be exported as a function.', () => {
      expect(receiveMeteors).to.be.a('function')
    })
    
    it('Should return an action with type "RECEIVE_METEORS".', () => {
      expect(receiveMeteors()).to.have.property('type', RECEIVE_METEORS)
    })
    
    it('Should assign the first argument to the "meteors" property.', () => {
      expect(receiveMeteors(5)).to.have.property('meteors', 5)
    })
  })
  
  describe('fetchMeteors', () => {
    let _globalState
    let _dispatchSpy
    
    beforeEach(() => {
      _globalState = {
        meteorDashboard : meteorDashboardReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          meteorDashboard : meteorDashboardReducer(_globalState.meteorDashboard, action)
        }
      })
    })
    
    it('Should be exported as a function.', () => {
      expect(fetchMeteors).to.be.a('function')
    })
    
    it('Should return a function (is a thunk).', () => {
      expect(fetchMeteors()).to.be.a('function')
    })
    
    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return fetchMeteors()(_dispatchSpy).should.eventually.be.fulfilled
    })
    
    it('Should call dispatch exactly once.', () => {
      return fetchMeteors()(_dispatchSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
        })
    })
    
    it('Should produce a state with non-empty meteors.', () => {
      _globalState = { meteorDashboard : { meteors : [] } }
      
      return fetchMeteors()(_dispatchSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          expect(_globalState.meteorDashboard.meteors).to.not.be.empty
        })
    })
  })
  
  describe('changeValue', () => {
    it('Should be exported as a function.', () => {
      expect(changeValue).to.be.a('function')
    })
    
    it('Should return an action with type "CHANGE_VALUE".', () => {
      expect(changeValue()).to.have.property('type', CHANGE_VALUE)
    })
    
    it('Should assign the first argument to the "value" property.', () => {
      expect(changeValue(5)).to.have.property('value', 5)
    })
  })
})