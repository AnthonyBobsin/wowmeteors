import React from 'react'
import ReactDOM from 'react-dom'
import MeteorHeader from './MeteorHeader'

export default class MeteorHeaders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isFixed : false
    }
    this.handleHeadersLock = this.handleHeadersLock.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleHeadersLock)
    this.setState({
      initialHeaderHeight : ReactDOM.findDOMNode(this.refs.headers).offsetTop
    })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleHeadersLock)
  }

  handleHeadersLock (event) {
    this.setState({
      isFixed : this.state.initialHeaderHeight <= event.srcElement.body.scrollTop
    })
  }

  render () {
    let containerClasses = "meteor-headers"
    if (this.state.isFixed) containerClasses += " fixed-header"

    return (
      <div ref="headers" className={containerClasses}>
        {this.props.headers.map((header, i) => (
          <MeteorHeader
            key={i}
            value={header}/>
        ))}
      </div>
    )
  }
}
