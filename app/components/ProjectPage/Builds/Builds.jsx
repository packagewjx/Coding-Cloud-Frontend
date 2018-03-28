
import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import CreateAppModal from './CreateAppModal';
import pubsub from 'pubsub-js';


class Builds extends React.Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal()
    {
        this.setState({showModal: true});
        pubsub.publish('PubInitModal', "init");
    }
    closeModal()
    {
        this.setState({showModal: false});
    }

    render() {
        return (
            <ContentWrapper>
               <button className="btn" onClick={this.openModal}>测试</button>
                <CreateAppModal isOpen={this.state.showModal} onClose={this.closeModal} />

            </ContentWrapper>
        );
    }
}

export default Builds;

