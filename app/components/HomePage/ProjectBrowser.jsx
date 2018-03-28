/**
 Create Date: 1/23/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:
 */

import React from 'react';
import { Row, Col, Panel, Button, FormControl, FormGroup, Media, Modal, ButtonToolbar} from "react-bootstrap";
import { findIconClass } from "./constants";
import { Link } from 'react-router';


class ProjectBrowser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            CreateBtnIsDisabled: true,
        }
     
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.canCreate = this.canCreate.bind(this);
        this.createProject = this.createProject.bind(this);
    }
    showModal() {
        this.setState({ show: true });
    }

    closeModal() {
        this.setState({ show: false });
    }
    createProject() {
        this.setState({ show: false });
        //*******************
    }
   
    canCreate() {
        if ($("#projectName").val() !== "" && $("#displayName").val() !== "")
            this.setState({ CreateBtnIsDisabled: false });
        else
            this.setState({ CreateBtnIsDisabled: true });
    }

    render() {
        return (
            <div>
                <Row className="project-browser">
                    <Col lg={12}>
                        <Row className="row">
                            <Col md={6}>
                                <Link to="/projectList" > My Projects</Link>
                            </Col>
                            <Col md={6}>
                                <Button className="browser-align-right btn" onClick={this.showModal}>Create Project</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <label> this is a p.</label>
                            </Col>
                            <Col md={6}>
                                <Link className="browser-align-right" to="/projectList">link</Link>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col md={12}>
                                <label className="browser-large">jfkdfxxxxxxxxxxxxxxxxxxxxxxxxjd</label>
                            </Col>
                        </Row>
                    </Col>
                 </Row>
                <Modal show={this.state.show} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row lg={6}>
                            <Col lg={12}>
                                <form>
                                    <FormGroup>
                                        <label>*Name</label>
                                        <FormControl id="projectName" type="text" placeholder="my-project" className="form-control" onChange={this.canCreate} />
                                        <small>project name must be unique.</small>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Display Name</label>
                                        <FormControl id="displayName" type="text" placeholder="My project" className="form-control form-control" onChange={this.canCreate} />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>description</label>
                                        <textarea id="decribeArea" placeholder="a short describe" className="form-control">
                                        </textarea>
                                    </FormGroup>
                                    <FormGroup >
                                        <div className="form-inline navbar-right">
                                            <ButtonToolbar>
                                                <Button type="button" onClick={this.closeModal} className="btn" >Cancel</Button>
                                                <Button id="createBtn" type="button" onClick={this.createProject} className="btn" disabled={this.state.CreateBtnIsDisabled}>Create</Button>
                                            </ButtonToolbar>
                                        </div>
                                    </FormGroup>
                                </form>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
             </div>
        );
    }
}



export default  ProjectBrowser ;
