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
import {IndexRedirect, Route, Router, Link, useRouterHistory, IndexRoute} from 'react-router';
import {createHistory} from 'history';

import initTranslation from './components/Common/localize';
import initLoadThemes from './components/Common/load-themes';
import BasePage from './components/Layout/BasePage';
import Login from "./components/Login";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import HomePage from "./components/HomePage/HomePage";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import ProjectOverView from "./components/ProjectPage/Overview/ProjectOverView";
import WebIDE from "./components/WebIDE/WebIDE";



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
        <Route path="/project" component={ProjectPage}>
            <IndexRedirect to="overview"/>
            <Route path="overview" component={ProjectOverView}/>
            <Route path="webide" component={WebIDE}/>
            <Route path="applications">
                <IndexRedirect to="deployments"/>
                <Route path="deployments"/>
                <Route path="statefulSets"/>
                <Route path="pods"/>
                <Route path="services"/>
                <Route path="routes"/>
            </Route>
            <Route path="builds">
                <IndexRedirect to="builds"/>
                <Route path="builds"/>
                <Route path="pipelines"/>
                <Route path="images"/>
            </Route>
            <Route path="resources">
                <IndexRedirect to="quota"/>
                <Route path="quota"/>
                <Route path="membership"/>
                <Route path="configMaps"/>
                <Route path="secrets"/>
                <Route path="otherResources"/>
            </Route>
            <Route path="storage"/>
            <Route path="monitoring"/> 7
        </Route>

        {/*Pages*/}
        <Route path="/" component={BasePage}>
            <IndexRoute component={Login}/>
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
