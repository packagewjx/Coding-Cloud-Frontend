/*!
 *
 * Angle - Bootstrap Admin App + ReactJS
 *
 * Version: 3.7.5
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRedirect, Route, Router,Link, useRouterHistory} from 'react-router';
import {createHistory} from 'history';

import initTranslation from './components/Common/localize';
import initLoadThemes from './components/Common/load-themes';
import BasePage from './components/Layout/BasePage';
import Login from "./components/Login";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import HomePage from "./components/HomePage/HomePage";


// Init translation system
initTranslation();
// Init css loader (for themes)
initLoadThemes();

// Disable warning "Synchronous XMLHttpRequest on the main thread is deprecated.."
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.async = true;
});

// specify basename below if running in a subdirectory or set as "/" if app runs in root
const appHistory = useRouterHistory(createHistory)({
    basename: WP_BASE_HREF
});

ReactDOM.render(
    <Router history={appHistory}>
        {/*<Route path="/" component={Base}>*/}

        {/*</Route>*/}

        {/*Pages*/}
        <Route path="/" component={BasePage}>
            <IndexRedirect to="login"/>
            <Route path="login" component={Login}/>
            <Route path="home" component={HomePage}/>
        </Route>

        {/* Not found handler */}
        {/*<Route path="*" component={NotFound}/>*/}
    </Router>,
    document.getElementById('app'));

// Auto close sidebar on route changes
appHistory.listen(function (ev) {
    $('body').removeClass('aside-toggled');
});
