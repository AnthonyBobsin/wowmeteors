require('es6-promise').polyfill()
import fetch from 'isomorphic-fetch'

export const ADD_METEOR = 'ADD_METEOR'
export const RECEIVE_METEORS = 'RECEIVE_METEORS'
export const CHANGE_VALUE = 'CHANGE_VALUE'

export function addMeteor (value) {
  return {
    type : ADD_METEOR,
    value
  }
}

export function receiveMeteors(json) {
  return {
    type : RECEIVE_METEORS,
    meteors: json
  }
}

export function fetchMeteors() {
  return dispatch => {
    return fetch('http://localhost:8080/meteors?lowerLimit=0&upperLimit=1000')
      .then(response => response.json())
      .then(json => dispatch(receiveMeteors(json)))
  }
}

export function changeValue (value) {
  return {
    type : CHANGE_VALUE,
    value
  }
}
