
import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import { Row, Col, Panel, Button, FormControl, FormGroup } from 'react-bootstrap';
import pubsub from 'pubsub-js';
import { NavDropdown, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap';

class CreateAppMain extends React.Component {
    constructor()
    {
        super();
        this.appNameValue = "";
        this.gitRepoValue = "";
    }
    componentDidMount() {
        this.pubsub_IfSave = pubsub.subscribe('PubSaveValue', function (topic, message) {
           this.appNameValue = "";
           this.gitRepoValue = "";
        }.bind(this))
    }
    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_IfSave);
    }

    finishWriting()
    {
        pubsub.publish('PubStepTwoIsDisabled',"enable");
    }
    getDefaultLink()
    {
        let tem = document.getElementById("gitRepositoryId");
       tem.value = "https://github.com/openshift/openshift-jee-sample.git";
    }
    check()
    {
        let appName = document.getElementById("appNameId").value;
         let repo  = document.getElementById("gitRepositoryId").value;
        if(appName !== "" && repo !== "")
        {
            pubsub.publish('PubStepTwoIsDisabled',"enable");
        }
        else
            pubsub.publish('PubStepTwoIsDisabled',"disable");
    }

    render() {
        switch(this.props.step)
        {
            case 1:
                return (
                    <ContentWrapper>
                        <div className="form-inline">
                            <p>
                                <em className="icon-grid"/>
                              <span>WildFly 10.0<br/>
                               builder wildfly java
                            </span>
                            </p>
                        </div>
                        <p>
                <span>
                    Build and run WildFly 10.0 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see <a href="https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md" target="_blank">https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md</a>.
                Sample Repository: <a href="https://github.com/openshift/openshift-jee-sample.git" target="_blank">https://github.com/openshift/openshift-jee-sample.git</a>
                </span>
                        </p>
                    </ContentWrapper>
                );
                break;
            case 2:
                return (
                    <ContentWrapper>
                        <Row>
                            <Col sm={ 6 }>
                                    <form role="form">
                                        <FormGroup>
                                            <label>*添加进项目</label>
                                            <select className="form-control">
                                                <option value="0">project1</option>
                                                <option value="1">project2</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>版本</label>
                                            <select className="form-control">
                                                <option value="0">10.1</option>
                                                <option value="1">10.2</option>
                                            </select>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>*应用名</label>
                                            <Col>
                                                <input id="appNameId" className="form-control" type="text" onChange={this.check}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Git仓库</label>
                                            <Col>
                                                <input id="gitRepositoryId" className="form-control" type="text" onChange={this.check}/>
                                            </Col>
                                            <a className="link" onClick={this.getDefaultLink}>try Sample Repository</a>
                                        </FormGroup>
                                    </form>
                            </Col>
                        </Row>
                    </ContentWrapper>
                );
                break;
            case 3:
                return (
                    <ContentWrapper>
                    <h1>step 3</h1>
                    </ContentWrapper>
                );
            break;
            default:
                return (
                    <ContentWrapper>
                        <span>fault</span>
                    </ContentWrapper>
                )
            break;
        }

    }
}

export default CreateAppMain;