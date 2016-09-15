
export const ADD_METEOR = 'ADD_METEOR'
export const CHANGE_VALUE = 'CHANGE_VALUE'

export function addMeteor (value) {
  return {
    type : ADD_METEOR,
    value
  }
}

export function changeValue (value) {
  return {
    type : CHANGE_VALUE,
    value
  }
}

export const actions = {
  addMeteor,
  changeValue
}

const ACTION_HANDLERS = {
  [ADD_METEOR] : (state, action) => ({
    ...state,
    meteors : [
      ...state.meteors,
      action.value
    ],
    value   : ''
  }),
  [CHANGE_VALUE] : (state, action) => ({
    ...state,
    value : action.value
  })
}

const initialState = { meteors: [], value: '' }
export default function meteorDashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
