import React, {Component} from 'react'
import Modal from '../Modal/modal'

class AddTaskButton extends Component {
    constructor(props) {
        super(props)

        this.state = { isOpen: false }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div className="AddTaskButton">
                <button onClick={this.toggleModal}>
                    Add Task
                </button>

                <Modal show={this.state.isOpen}
                onClose={this.toggleModal}>
                    Content for the modal/where user adds their new task information
                </Modal>
            </div>
        )
    }
}

export default AddTaskButton