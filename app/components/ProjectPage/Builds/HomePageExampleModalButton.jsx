import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap';

export default class HomePageExampleModalButton extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal() {
        this.setState({ showModal: true })
    }
    closeModal() {
        this.setState({ showModal: false })
    }
    render() {
        return (
            <a className={this.props.className} onClick={this.openModal}>
                Open A Modal
                <FirstModal isOpen={this.state.showModal} onClose={this.closeModal} />
            </a>
        )
    }
}

const customStyles = {
    zIndex: 9999,
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: 1000,
        height: 500,
        marginRight: '-50%',
        backgroundColor: 'white',
        transform: 'translate(-50%, -50%)'
    }
}
const rootApp = document.getElementById('app')
class FirstModal extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div ref={node => (this.modalContainer = node)}>
                <Modal
                    isOpen={this.props.isOpen}
                    style={customStyles}
                    appElement={rootApp}
                    modalPortal="example-dialog"
                    contentLabel="Example Modal"
                >
                    <Button className="btn" onClick={this.props.onClose}>关闭</Button>
                </Modal>
            </div>
        )
    }
}

FirstModal.props = { isOpen: PropsTypes.bool}
FirstModal.props = { onClose: PropTypes.func}
