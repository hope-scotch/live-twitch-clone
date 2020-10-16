import React from 'react'
import ReactDOM from 'react-dom'

// React Portals
// When any component is deeply nested in the component hierarchy
// We use Portals to shift/modify the position of the component in the hierarchy   
// In this case, we make Modal a direct child of the body element in index.html

// Use Cases
// Creating a Modal
// Rendering some React Component in some HTML not created by our app
// -> Introduce React into a server-side rendered app

// Prevent event bubbling
// e.stopPropagation() -> prevents event bubbling/propagation
const Modal = props => {
  return ReactDOM.createPortal(
    <div 
      onClick={props.onDismiss} 
      className="ui dimmer modals visible active"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  )
}

export default Modal