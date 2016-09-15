import { connect } from 'react-redux'
import { addMeteor, changeValue } from '../modules/meteorDashboard'

import MeteorDashboard from '../components/MeteorDashboard'

const mapDispatchToProps = {
  addMeteor,
  changeValue
}

const mapStateToProps = (state) => ({
  meteors : state.meteorDashboard.meteors,
  value   : state.meteorDashboard.value
})

export default connect(mapStateToProps, mapDispatchToProps)(MeteorDashboard)
