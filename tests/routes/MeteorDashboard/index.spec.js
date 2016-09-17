import MeteorDashboardRoute from 'routes/MeteorDashboard'

describe('(Route) MeteorDashboard', () => {
  let _route
  
  beforeEach(() => {
    _route = MeteorDashboardRoute({})
  })
  
  it('Should return a route configuration object.', () => {
    expect(typeof _route).to.equal('object')
  })
  
  it('Configuration should contain path `meteor-dashboard`.', () => {
    expect(_route.path).to.equal('meteor-dashboard')
  })
})