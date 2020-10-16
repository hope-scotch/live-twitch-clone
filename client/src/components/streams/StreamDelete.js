import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Modal from '../Modal'
import history from '../../history'
import { deleteStream, fetchStream } from '../../actions'

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions() {
    return (
      // React Fragment -> JSX looking element -> does NOT impact the DOM -> servers our purpose of an enclosing tag
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)}
          className="ui button negative">Delete</button>
        <Link to="/" className="ui button">Cancel</Link>
      </React.Fragment>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete the stream?'
    }

    return (
      <React.Fragment>
        Are you sure you want to delete the stream <b>{this.props.stream.title}</b> ?
      </React.Fragment>)
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete)