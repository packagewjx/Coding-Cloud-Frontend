import React from 'react';
import CreateAppHeader from './CreateAppHeader';
import CreateAppMain from './CreateAppMain';
import CreateAppFooter from './CreateAppFooter';
import pubsub from 'pubsub-js';
import PropTypes from 'prop-types';
import Modal from 'react-modal'

const customStyles = {
    zIndex: 9999,
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: 700,
        height: 500,
        marginRight: '-50%',
        backgroundColor: 'white',
        transform: 'translate(-50%, -50%)'
    }
}
const modalHeaderStyle = {
    height: 100,
}
const modalMainStyle = {
    height: 350,
}
const rootApp = document.getElementById('app')
class CreateAppModal extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1
        };
    }

    componentDidMount() {
        this.pubsub_token = pubsub.subscribe('PubCreateApp', function (topic, message) {
            switch(message)
            {
                case "cancel":
                  this.props.onClose();
                    break;
                case "back":
                    this.setState({step: this.state.step - 1});
                    break;
                case "next":
                    if(this.state.step === 3)
                        this.props.onClose();
                    else
                        this.setState({step: this.state.step + 1});
                    break;
                default:
                    console.log("never arrives here");
                    break;
            }
        }.bind(this));

        this.pubsub_init = pubsub.subscribe('PubInitModal', function (topic, message){
            this.setState({step: 1})
        }.bind(this) )
    }

        componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_token);
        pubsub.unsubscribe(this.pubsub_init);
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
                    <CreateAppHeader className="modal-header" step={this.state.step} />
                    <CreateAppMain className="modal-main" step={this.state.step} />
                    <CreateAppFooter className="modal-footer" step={this.state.step} />
                </Modal>
            </div>
        )
    }
}

CreateAppModal.props = { isOpen: PropTypes.bool}
CreateAppModal.props = { onClose: PropTypes.func}

export default CreateAppModal;
