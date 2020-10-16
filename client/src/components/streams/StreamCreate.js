import React from 'react'
import { connect } from 'react-redux'
import { createStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {

  onSubmit = (formValues) => {
    this.props.createStream(formValues)
  }

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />  
      </div>
    )
  }
}

export default connect(
  null,
  { createStream }
)(StreamCreate)




/***** Without using StreamForm Component ****/

// Field is a React Component
// reduxForm is a function
// reduxForm wraps the Component and passes a lot of props into the Component

// class StreamCreate extends React.Component {

//   renderError({ error, touched }) {
//     if (touched && error) {
//       return (
//         <div className="ui error message">
//           <div className="header">{error}</div>
//         </div>
//       )
//     }
//   }

//   // renderInput is a helper method called from some other component
//   // => It will be called with an unknown value of 'this'
//   renderInput = ({ input, label, meta }) => {
//     // formProps already has all methods and parameters associated with an input element
//     // That is because we are hooking up renderInput with the 'component' prop of Field
//     // Whenever renderInput is called -> formProps gets the required methods and paramters
//     // Redux-Form knows it HAS to be an input -> But it does NOT know what we actually intend to do
//     return (
//       <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
//       <label>{label}</label>
//       <input {...input} autoComplete="off"/>
//       {this.renderError(meta)}
//       </div>
//     )

//     // ...formProps.input
//     // onChange={formProps.input.onChange} 
//     // value={formProps.input.value}
//   }

//   onSubmit = (formValues) => {
//     // event.preventDefault() // Automatically gets called for us by Redux
//     // formValues -> key: name, value: value of ALL the forms rendered and Submitted
//     this.props.createStream(formValues)
//   }

//   render() {
//     return (
//       <form 
//         onSubmit={this.props.handleSubmit(this.onSubmit)}
//         className="ui form error">
//         <Field name="title" component={this.renderInput} label="Enter Title"/>
//         <Field name="description" component={this.renderInput} label="Enter Description"/>
//         <button className="ui button primary">Submit</button>
//         {
//           // **** Field Component ****
//           // Anything than can be used to take input from the user -> Text-Field, Radio-Buttons etc.
//           // Field Component does NOT by itself render an input-field/button/check-box/text-field etc.
//           // It only handles the form-inputs and manages form-data over various Redux-React components
//           // We need to handle what to render to the DOM

//           // If it has a custom prop which it does NOT know what to do with, it passes it to the component as a prop
//         }
//       </form>
//     )
//   }
// }

// const validate = (formValues) => {
//   const errors = {}

//   // Perform some validation
//   if (!formValues.title) {
//     errors.title = 'You must enter a title'
//   }

//   if (!formValues.description) {
//     errors.description = 'You must enter a description'
//   }

//   return errors

//   // if input is valid -> return an empty object
//   // Returning an empty object makes redux think our form is valid
//   // If input is invalid -> return an object
//   // For each invalid field, put a key-value pair on the object with the NAME of the field and an error message
//   // Redux form rerenders our component
//   // Each 'Field' rendered with the error message from the 'errors' object -> and passes it on to renderInput
//   // BECAUSE the name of a Field component matches a property name of error, the error message is available on the meta object inside renderInput function
// }

// const formWrap = reduxForm({
//   // Single Config Obj
//   // 'form' created with the key-name 'streamCreate'
//   // streamCreate has 2 properties -> registered Fields, value
//   form: 'streamCreate',
//   // Every time form is initially rendered OR user interacts
//   validate
// })(StreamCreate)

// export default connect(
//   null,
//   { createStream }
// )(formWrap)