/**
 Create Date: 1/31/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:
 */
import React from 'react';
import { Row, Col, Panel, Button, FormControl, FormGroup, Media, Modal} from "react-bootstrap";
import {findIconClass} from "./constants";

class CatalogItemBuildDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = { show: this.props.show }
        this.closeModal = this.closeModal.bind(this);
        this.tableInfor = [];
        this.projectOptions = ["Create Project","Recently View"];
    }


    closeModal() {
        this.setState({ show: false });
        this.tableInfor = [];
        if (typeof this.props.onModalClosed === 'function')
            this.props.onModalClosed();
    }
    
    componentDidMount() {
        // FORM EXAMPLE
        var form = $("#buildImageForm");
        form.validate({
            errorPlacement: function errorPlacement(error, element) {
                element.before(error);
            },
            rules: {
                confirm: {
                    equalTo: "#password"
                }
            }
        });
        form.children("div").steps({
            headerTag: "h4",
            bodyTag: "fieldset",
            transitionEffect: "slideLeft",
            onStepChanging: function (event, currentIndex, newIndex) {
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            },
            onFinishing: function (event, currentIndex) {
                form.validate().settings.ignore = ":disabled";
                return form.valid();
            },
            onFinished: function (event, currentIndex) {
                alert("Submitted!");

                // Submit form
                $(this).submit();
            }
        });
    }
   
    render() {
        /**
         * @type Item
         */
        let item = this.props.item;
        console.log(item);
        
        if (item.lastAppliedConfiguration) {
            let parameters = item.lastAppliedConfiguration.parameters;
            for (let i = 0; i < parameters.length; i++) {

                this.tableInfor.push(
                    <FormGroup key={i} style={{ 'marginTop': 10 }}>
                        <label>{(parameters[i].required ? '*' : '') + parameters[i].displayName}</label>
                        <FormControl id={parameters[i].name} type="text" value={parameters[i].value} className="form-control" />
                        {parameters[i].description}
                    </FormGroup>

                )
            }
        }
        else
        {
            let name = item.displayName;
           
            this.tableInfor.push(
                <FormGroup>
                    <label className="col-sm-2 control-label">Select</label>
                    <Col sm={10}>
                        <FormControl componentClass="select" name="account">
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </FormControl>
                    </Col>
                </FormGroup>)
        }
       

        return (

            <Modal show={this.state.show} bsSize="large">
                <Modal.Header closeButton onHide={this.closeModal}>
                    <Modal.Title>{item.displayName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="buildImageForm" action="#">
                        <div>
                            <h4>信息</h4>
                            <fieldset>
                                <Media>
                                    <Media.Left>
                                        <img width={64} height={64} src={item.iconClass ?
                                            "img/" + findIconClass(item.iconClass) : "img/logo/faclone.svg"}
                                             alt="thumbnail"/>
                                    </Media.Left>
                                    <Media.Body>
                                        <Media.Heading>{item.displayName}</Media.Heading>
                                        <p>{item.tags}</p>
                                    </Media.Body>
                                </Media>
                                <p>
                                    {item.description || "暂无描述"}
                                </p>
                            </fieldset>
                            <h4>配置</h4>
                            <fieldset style={{ 'overflow': 'scroll'}}>
                                <fieldset>
                                    <Row>
                                        <Col sm={12}>
                                            {this.tableInfor}
                                        </Col>
                                    </Row>
                                </fieldset>
                            </fieldset>
                            <h4>结果</h4>
                            <fieldset>
                                <p className="lead text-center">Almost there!</p>
                            </fieldset>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}


export default CatalogItemBuildDialog;