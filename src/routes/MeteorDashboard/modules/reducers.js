import {
  ADD_METEOR,
  RECEIVE_METEORS,
  CHANGE_VALUE
} from './actions'

const ACTION_HANDLERS = {
  [ADD_METEOR]       : (state, action) => ({
    ...state,
    meteors : [
      ...state.meteors,
      action.value
    ],
    value   : ''
  }),
  [RECEIVE_METEORS]  : (state, action) => ({
    ...state,
    meteors : action.meteors
  }),
  [CHANGE_VALUE]     : (state, action) => ({
    ...state,
    value : action.value
  })
}

const initialState = { meteors: [], value: '' }
export default function meteorDashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
