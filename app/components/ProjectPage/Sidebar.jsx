import React from 'react';
import {History, Link, withRouter} from 'react-router';
import pubsub from 'pubsub-js';
import {Collapse} from 'react-bootstrap';
import SidebarRun from './Sidebar.run';

class Sidebar extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            userBlockCollapse: false,
            collapse: {
                applications: this.routeActive(['project/applications']),
                builds: this.routeActive(['project/builds']),
                resources: this.routeActive(['project/resources']),
            }
        };
        this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
            this.setState({
                userBlockCollapse: !this.state.userBlockCollapse
            });
        });
    };

    componentDidMount() {
        // pass navigator to access router api
        SidebarRun(this.navigator.bind(this));
    }

    navigator(route) {
        this.props.router.push(route)
    }

    componentWillUnmount() {
        // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
        pubsub.unsubscribe(this.pubsub_token);
    }

    routeActive(paths) {
        paths = Array.isArray(paths) ? paths : [paths];
        for (let p in paths) {
            if (this.props.router.isActive(paths[p]) === true)
                return true;
        }
        return false;
    }

    toggleItemCollapse(stateName) {
        var newCollapseState = {};
        for (let c in this.state.collapse) {
            if (this.state.collapse[c] === true && c !== stateName)
                this.state.collapse[c] = false;
        }
        this.setState({
            collapse: {
                [stateName]: !this.state.collapse[stateName]
            }
        });
    }

    render() {
        return (
            <aside className='aside'>
                {/* START Sidebar (left) */}
                <div className="aside-inner">
                    <nav data-sidebar-anyclick-close="" className="sidebar">
                        {/* START sidebar nav */}
                        <ul className="nav">
                            {/* START user info */}
                            <li className="has-user-block">
                                <Collapse id="user-block" in={this.state.userBlockCollapse}>
                                    <div>
                                        <div className="item user-block">
                                            {/* User picture */}
                                            <div className="user-block-picture">
                                                <div className="user-block-status">
                                                    <img src="img/user/02.jpg" alt="Avatar" width="60" height="60"
                                                         className="img-thumbnail img-circle"/>
                                                    <div className="circle circle-success circle-lg"></div>
                                                </div>
                                            </div>
                                            {/* Name and Job */}
                                            <div className="user-block-info">
                                                <span className="user-block-name">Hello, Mike</span>
                                                <span className="user-block-role">Designer</span>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </li>
                            {/* END user info */}
                            {/* Iterates over all sidebar items */}
                            <li className="nav-heading ">
                                <span data-localize="sidebar.heading.HEADER">Main Navigation</span>
                            </li>

                            <li className={this.routeActive('project/overview') ? 'active' : ''}>
                                <Link to="project/overview" title="概览">
                                    <em className="fa fa-tachometer"/>
                                    <span>概览</span>
                                </Link>
                            </li>

                            <li className={this.routeActive(['project/applications/deployments', 'project/applications/statefulSets',
                                'project/applications/pods', 'project/applications/services', 'project/applications/routes']) ? 'active' : ''}>
                                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'applications')}>
                                    <em className="fa fa-cubes"/>
                                    <span>应用程序</span>
                                </div>
                                <Collapse in={this.state.collapse.applications} timeout={100}>
                                    <ul id="applicationsSubmenu" className="nav sidebar-subnav">
                                        <li className={this.routeActive('project/applications/deployments') ? 'active' : ''}>
                                            <Link to="project/applications/deployments" title="部署">
                                                部署
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/applications/statefulSets') ? 'active' : ''}>
                                            <Link to="project/applications/statefulSets" title="状态集">
                                                状态集
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/applications/pods') ? 'active' : ''}>
                                            <Link to="project/applications/pods" title="Pods">
                                                Pods
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/applications/services') ? 'active' : ''}>
                                            <Link to="project/applications/services" title="服务">
                                                服务
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/applications/routes') ? 'active' : ''}>
                                            <Link to="project/applications/routes" title="路由">
                                                路由
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>

                            <li className={this.routeActive(['project/builds/builds', 'project/builds/pipelines',
                                'project/builds/images']) ? 'active' : ''}>
                                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'builds')}>
                                    <em className="icon-layers"/>
                                    <span>构建</span>
                                </div>
                                <Collapse in={this.state.collapse.builds} timeout={100}>
                                    <ul id="buildsSubmenu" className="nav sidebar-subnav">
                                        <li className={this.routeActive('project/builds/builds') ? 'active' : ''}>
                                            <Link to="project/builds/builds" title="构建">
                                                构建
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/builds/images') ? 'active' : ''}>
                                            <Link to="project/builds/pipelines" title="流水线">
                                                流水线
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/builds/images') ? 'active' : ''}>
                                            <Link to="project/builds/images" title="镜像">
                                                镜像
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>

                            <li className={this.routeActive(['project/resources/quota', 'project/resources/membership',
                                'project/resources/configMaps', 'project/resources/secrets', 'project/resources/otherResources']) ? 'active' : ''}>
                                <div className="nav-item" onClick={this.toggleItemCollapse.bind(this, 'resources')}>
                                    <em className="fa fa-files-o"/>
                                    <span>资源</span>
                                </div>
                                <Collapse in={this.state.collapse.resources} timeout={100}>
                                    <ul id="resourcesSubmenu" className="nav sidebar-subnav">
                                        <li className={this.routeActive('project/resources/quota') ? 'active' : ''}>
                                            <Link to="project/resources/quota" title="配额">
                                                配额
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/resources/membership') ? 'active' : ''}>
                                            <Link to="project/resources/membership" title="成员关系">
                                                成员关系
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/resources/configMaps') ? 'active' : ''}>
                                            <Link to="project/resources/configMaps" title="配置值">
                                                配置值
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/resources/secrets') ? 'active' : ''}>
                                            <Link to="project/resources/secrets" title="密钥">
                                                密钥
                                            </Link>
                                        </li>
                                        <li className={this.routeActive('project/resources/otherResources') ? 'active' : ''}>
                                            <Link to="project/resources/otherResources" title="其他资源">
                                                其他资源
                                            </Link>
                                        </li>
                                    </ul>
                                </Collapse>
                            </li>

                            <li className={this.routeActive('project/storage') ? 'active' : ''}>
                                <Link to="project/storage" title="存储">
                                    <em className="fa fa-database"/>
                                    存储
                                </Link>
                            </li>

                            <li className={this.routeActive('project/monitoring') ? 'active' : ''}>
                                <Link to="project/monitoring" title="监控">
                                    <em className="fa fa-desktop"/>
                                    监控
                                </Link>
                            </li>

                        </ul>
                        {/* END sidebar nav */}
                    </nav>
                </div>
                {/* END Sidebar (left) */}
            </aside>
        );
    }

}

export default withRouter(Sidebar);

