/**
 Create Date: 1/31/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:
 */
import React from 'react';
import {Button, FormControl, Media, Modal} from "react-bootstrap";
import {findIconClass} from "./constants";

class CatalogItemBuildDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {show: this.props.show}
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({show: false});
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

        return (
            /* Insert your Component Here */
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
                            <fieldset>

                                <p>(*) Mandatory</p>
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