import { injectReducer } from '../../store/reducers'

export default (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const MeteorDashboard = require('./containers/MeteorDashboardContainer').default
      const reducer = require('./modules/reducers').default

      injectReducer(store, { key: 'meteorDashboard', reducer })

      cb(null, MeteorDashboard)
    }, 'meteorDashboard')
  }
})
