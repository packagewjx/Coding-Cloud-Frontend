/**
 Create Date: 1/23/18
 @author Zheng Kaifeng
 Description: WebIDE
 */

import {withRouter} from "react-router";

var React = require('react');
class WebIDE extends React.Component {
    constructor(props) {
        super(props);

        this.routerWillLeave = this.routerWillLeave.bind(this);
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    }

    routerWillLeave() {
        return "你确定要离开WebIDE吗？";
    }

    render() {
        console.log(this);
        return (
            <iframe src="http://116.56.140.108:8080/" frameBorder="0" width="100%" height="1000">/*WebIDE嵌入*/
            </iframe>
        );
    }

}

export default withRouter(WebIDE);
