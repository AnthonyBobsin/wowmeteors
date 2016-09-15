import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'meteor-dashboard',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MeteorDashboard = require('./containers/MeteorDashboardContainer').default
      const reducer = require('./modules/meteorDashboard').default

      injectReducer(store, { key: 'meteorDashboard', reducer })

      cb(null, MeteorDashboard)
    }, 'meteorDashboard')
  }
})
