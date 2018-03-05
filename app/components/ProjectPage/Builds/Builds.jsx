/*
import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import { Row, Col, Panel, Button, FormControl, FormGroup } from 'react-bootstrap';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top                   : '22%',
        left                  : '27%',
        right                 : '40%',
        bottom                : 'auto',

    },
};

class Builds extends React.Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            CreateBtnIsDisabled: true,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createProject = this.createProject.bind(this);
        this.canCreate = this.canCreate.bind(this);

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    createProject()
    {
        this.setState({modalIsOpen: false});
        //*******************
    }
    canCreate()
    {
        if($("#projectName").val() !== "" && $("#displayName").val() !== "" )
            this.setState({CreateBtnIsDisabled: false});
        else
            this.setState({CreateBtnIsDisabled: true});
    }

    render() {
        return (
            <ContentWrapper>
                <div>
                    <label>
                        <span>开始</span>
                    </label>
                    <Button type="button" onClick={this.openModal} style={{'margin': 10}}>
                        <div>
                            <em className="icon-plus"></em>
                            创建项目
                        </div>
                    </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <Row>
                            <Col sm={ 6 }>
                                <form role="form">
                                    <FormGroup>
                                        <label>*名字</label>
                                        <FormControl id="projectName" type="text" placeholder="my-project" className="form-control" onChange={this.canCreate}/>
                                        <small>项目名必须唯一</small>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>显示名称</label>
                                        <FormControl id="displayName" type="text" placeholder="My project" className="form-control form-control" onChange={this.canCreate}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>描述</label>
                                        <textarea id="decribeArea" placeholder="a short describe" className="form-control">
                                                </textarea>
                                    </FormGroup>
                                    <FormGroup >
                                        <div  className="form-inline navbar-right">
                                            <Button type="button" onClick={this.closeModal} className="btn">取消</Button>
                                            <Button id="createBtn" type="button" onClick={this.createProject} className="btn" disabled={this.state.CreateBtnIsDisabled}>创建</Button>
                                        </div>
                                    </FormGroup>
                                </form>
                            </Col>
                        </Row>
                    </Modal>
                </div>
            </ContentWrapper>
        );
    }



}

export default Builds;

*/
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
