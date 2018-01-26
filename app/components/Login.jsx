import React from 'react';
import {RestClient, SERVER} from "./Util/RestClient";
import {RESULT_CODE} from "./Common/constants";
import {Alert} from "react-bootstrap";

class Login extends React.Component {

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);

        this.state = {badCredential: false};
    }

    componentDidMount() {
        if (typeof RestClient.token !== 'undefined') {
            this.loginSuccess(RestClient.token);
        }
    }

    handleLogin() {
        let username = $("#inputUsername").val();
        let password = $("#inputPassword").val();
        let success = function (data) {
            if (data.resultCode === RESULT_CODE.success && typeof data.data === 'string') {
                this.setState({badCredential: false, hasError: false});
                this.loginSuccess(data.data);
            } else if (data.resultCode === RESULT_CODE['bad-credential']) {
                this.setState({badCredential: true});
            }
        };
        success = success.bind(this);
        let error = function (data, status) {
            console.log(data);
            this.setState({hasError: true});
        };
        error = error.bind(this);
        RestClient.get(SERVER.BACKEND, "/login", {username: username, password: password}, success, error);
    }

    loginSuccess(token) {
        this.props.router.replace("home");
        RestClient.token = token;
    }

    render() {
        return (
            <div className="block-center mt-xl wd-xl">
                {/* START panel */}
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        <a href="#">
                            <img src="../img/logo.png" alt="Image" className="block-center img-rounded"/>
                        </a>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">请登录以继续</p>
                        <form className="mb-lg">
                            <div
                                className={this.state.badCredential ? "form-group has-feedback has-error" : "form-group has-feedback"}>
                                <input id="inputUsername" type="text" placeholder="输入用户名" autoComplete="off"
                                       required="required" className="form-control"/>
                                <span className="fa fa-user form-control-feedback text-muted"></span>
                            </div>
                            <div
                                className={this.state.badCredential ? "form-group has-feedback has-error" : "form-group has-feedback"}>
                                <input id="inputPassword" type="password" placeholder="密码" required="required"
                                       className="form-control"/>
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
                            {this.state.badCredential ?
                                <Alert bsStyle="danger">
                                    用户名或密码错误
                                </Alert>
                                : null}
                            {this.state.hasError ?
                                <Alert bsStyle="danger">
                                    出现错误
                                </Alert>
                                : null}

                            {/*TODO add remember me and reset password*/}
                            {/*<div className="clearfix">*/}
                            {/*<div className="checkbox c-checkbox pull-left mt0">*/}
                            {/*<label>*/}
                            {/*<input type="checkbox" value="" name="remember" />*/}
                            {/*<em className="fa fa-check"></em>Remember Me</label>*/}
                            {/*</div>*/}
                            {/*<div className="pull-right">*/}
                            {/*<Link to="recover" className="text-muted">Forgot your password?</Link>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            <button type="button" className="btn btn-block btn-primary mt-lg"
                                    onClick={this.handleLogin}>登录
                            </button>
                        </form>
                        {/*TODO add register page*/}
                        {/*<p className="pt-lg text-center">注册新用户</p>*/}
                        {/*<Link to="register" className="btn btn-block btn-default">Register Now</Link>*/}
                    </div>
                </div>
                {/* END panel */}
            </div>
        );
    }
}

export default Login;