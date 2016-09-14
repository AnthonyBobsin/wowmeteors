import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'meteors',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Meteors = require('./containers/MeteorsContainer').default
      const reducer = require('./modules/meteors').default

      injectReducer(store, { key: 'meteors', reducer })

      cb(null, Meteors)
    }, 'meteors')
  }
})
