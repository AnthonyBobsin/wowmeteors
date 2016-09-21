import { connect } from 'react-redux'
import {
  addMeteor,
  fetchMeteors
} from '../modules/actions'

import MeteorDashboard from '../components/MeteorDashboard'

const mapDispatchToProps = {
  addMeteor,
  fetchMeteors
}

const mapStateToProps = (state) => ({
  meteors : state.meteorDashboard.meteors,
  value   : state.meteorDashboard.value
})

export default connect(mapStateToProps, mapDispatchToProps)(MeteorDashboard)
