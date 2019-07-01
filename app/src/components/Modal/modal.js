import React from 'react'
// import PropTypes from 'prop-types'
import App from './index';
import './modal.css'

class Modal extends React.Component {
    render() {
        if(!this.props.show) {
            return null
        }
        //above renders nothing if the "show" prop is false

        const backdropStyle = {
            position: 'fixed',
            top :0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        }
        //above creates gray backgroud. I am not sure if we should instead put this in a .css file for Modals if we want to use more of them--Fionna

        
        //above is the modal window

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