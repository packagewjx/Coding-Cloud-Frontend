import React from 'react';
import {RestClient, SERVER} from "./Util/RestClient";

class Login extends React.Component {

    constructor() {
        super();
        //TODO check login status, if logged in, goto homepage.
        this.handleLogin = this.handleLogin.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
    }

    handleLogin() {
        let username = $("#inputUsername").val();
        let password = $("#inputPassword").val();
        let success = function (data) {
            console.log(data);
            //TODO check data
            this.loginSuccess(data.data);
        };
        console.log(this);
        success = success.bind(this);

        let error = function (data) {
            console.log(data);
        };
        RestClient.get(SERVER.BACKEND, "/login", {username: username, password: password}, success, error);
    }

    loginSuccess(token) {
        this.props.router.replace("home");
        //TODO store the token
    }

    render() {
        return (
            <div className="block-center mt-xl wd-xl">
                {/* START panel */}
                <div className="panel panel-dark panel-flat">
                    <div className="panel-heading text-center">
                        {/*TODO replace logo with our logo*/}
                        <a href="#">
                            <img src="../img/logo.png" alt="Image" className="block-center img-rounded"/>
                        </a>
                    </div>
                    <div className="panel-body">
                        <p className="text-center pv">请登录以继续</p>
                        <form role="form" data-parsley-validate="" noValidate className="mb-lg">
                            <div className="form-group has-feedback">
                                <input id="inputUsername" type="text" placeholder="输入用户名" autoComplete="off"
                                       required="required" className="form-control"/>
                                <span className="fa fa-user form-control-feedback text-muted"></span>
                            </div>
                            <div className="form-group has-feedback">
                                <input id="inputPassword" type="password" placeholder="密码" required="required"
                                       className="form-control"/>
                                <span className="fa fa-lock form-control-feedback text-muted"></span>
                            </div>
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