import React from 'react'
// import PropTypes from 'prop-types'
import AddTaskButton from './index'
import './modal.css'

class Modal extends React.Component {
    render() {
        if(!this.props.show) {
            return null
        }
        //above renders nothing if the "show" prop is false

        return (
            <div className = "backdrop" >
                <div className="modal" >
                    {this.props.children}
                    
                    <div className = "footer">
                        <button className="closebutton" onClick={this.props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropsTypes.bool,
//     children: PropTypes.node
// }

export default Modal