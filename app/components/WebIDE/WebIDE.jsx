/**
 Create Date: 1/23/18
 @author Zheng Kaifeng
 Description: WebIDE
 */

var React = require('react');
class WebIDE extends React.Component {

    render() {
        return (
            <iframe src="http://116.56.140.108:8080/" frameBorder="0" width="100%" height="1000">/*WebIDE嵌入*/
            </iframe>
        );
    }

}

export default WebIDE;
