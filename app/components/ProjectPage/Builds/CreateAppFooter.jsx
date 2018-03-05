
import React from 'react';
import ContentWrapper from "../../Layout/ContentWrapper";
import pubsub from 'pubsub-js';
import {  Button } from 'react-bootstrap';


class CreateAppFooter extends React.Component {
    constructor() {
        super();
        this.state = {
            stepTwoContinueIsDisabled: true,
        }

        this.cancelCreateApp = this.cancelCreateApp.bind(this);
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);

    }

    componentDidMount() {
        this.pubsub_steptwoisdisabled = pubsub.subscribe('PubStepTwoIsDisabled', function (topic, message) {
            if(message == "enable")
                 this.setState({ stepTwoContinueIsDisabled: false})
            else
                this.setState({ stepTwoContinueIsDisabled: true})
        }.bind(this));
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_steptwoisdisabled);
    }
    cancelCreateApp()
    {
        pubsub.publish('PubCreateApp',"cancel");
    }
    back()
    {
        pubsub.publish('PubCreateApp',"back");
    }
    next()
    {
        if(this.props.step === 1)
            pubsub.publish('PubSaveValue',"clear");
            pubsub.publish('PubCreateApp',"next");
            //判断是否需要重置第二步的appName和git Repo的值
    }
    render() {
        switch(this.props.step)
        {
            case 1:
                return(
                    <ContentWrapper>
                        <div className="navbar-right">
                            <Button className="btn" onClick={this.cancelCreateApp} disabled={false}>取消</Button>
                            <Button id="CreateAppBackBtn" className="btn" onClick={this.back} disabled={true}>返回</Button>
                            <Button id="CreateAppNextBtn" className="btn" onClick={this.next} disabled={false}>继续</Button>
                        </div>
                    </ContentWrapper>
                );
                break;
            case 2:
                return(
                    <ContentWrapper>
                        <div className="navbar-right">
                            <Button className="btn" onClick={this.cancelCreateApp} disabled={false}>取消</Button>
                            <Button id="CreateAppBackBtn" className="btn" onClick={this.back} disabled={false}>返回</Button>
                            <Button id="CreateAppNextBtn" className="btn" onClick={this.next} disabled={this.state.stepTwoContinueIsDisabled}>继续</Button>
                        </div>
                    </ContentWrapper>
                )
            break;
            case 3:
                return(
                    <ContentWrapper>
                        <div className="navbar-right">
                            <Button className="btn" onClick={this.cancelCreateApp} disabled={false}>取消</Button>
                            <Button id="CreateAppBackBtn" className="btn" onClick={this.back} disabled={false}>返回</Button>
                            <Button id="CreateAppNextBtn" className="btn" onClick={this.next} disabled={false}>关闭</Button>
                        </div>
                    </ContentWrapper>
                )
            break;
            default:
                return(
                    <ContentWrapper>
                    <span>fault</span>
                    </ContentWrapper>
                )
            break;
        }

    }
}

export default CreateAppFooter;