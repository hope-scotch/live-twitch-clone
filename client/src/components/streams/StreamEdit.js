import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { fetchStream } from '../../actions'
import { editStream } from '../../actions'
import StreamForm from './StreamForm'

// props are passed from react-router-dom
// Since we are using Route to render StreamEdit, RRD passes down a bunch of props

// match:
//  isExact: true
//  params:
//    id: "4"
//  __proto__: Object
//    path: "/streams/edit/:id"
//    url: "/streams/edit/4"

// With React-Router, each component needs to be designed to work in isolation (fetch its own data)
// Hence this component calls fetchStream by its own to fetch the data required by this component
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues)
  }

  // initialValues -> special property name
  // names of Fields have to match Object keys on initialValues

  // _.pick() helps us pick/pull properties off from objects
  // Passing the entire stream object passes the 'id' and 'userId' as well, which is inapt
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm initialValues={_.pick(this.props.stream, 'title', 'description')} onSubmit={this.onSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
  mapStateToProps, 
  { fetchStream, editStream }
)(StreamEdit)