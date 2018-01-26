import React from 'react';
import HeaderRun from './HomePageHeader.run'
import {ListGroupItem, NavDropdown} from 'react-bootstrap';
import {History, Link} from 'react-router';

class HomePageHeader extends React.Component {

    componentDidMount() {

        HeaderRun();

    }

    render() {
        const ddAlertTitle = (
            <span>
                <em className="icon-bell"></em>
                <span className="label label-danger">11</span>
            </span>
        );
        return (
            <header className="topnavbar-wrapper">
                {/* START Top Navbar */}
                <nav role="navigation" className="navbar topnavbar">
                    {/* START navbar header */}
                    <div className="navbar-header">

                        <a href="#/" className="navbar-brand">
                            <div className="brand-logo">
                                <img src="img/logo.png" alt="App Logo" className="img-responsive"/>
                            </div>
                            <div className="brand-logo-collapsed">
                                <img src="img/logo-single.png" alt="App Logo" className="img-responsive"/>
                            </div>
                        </a>
                    </div>
                    {/* END navbar header */}
                    {/* START Nav wrapper */}
                    <div className="nav-wrapper">
                        {/* START Right Navbar */}
                        <ul className="nav navbar-nav navbar-right">
                            {/* START Offsidebar button */}
                            <li>
                                <a href="#" data-toggle-state="offsidebar-open" data-no-persist="true">
                                    <em className="icon-notebook"></em>
                                </a>
                            </li>
                            {/* END Offsidebar menu */}
                        </ul>
                        {/* END Right Navbar */}
                    </div>
                    {/* END Nav wrapper */}
                    {/* START Search form */}
                    <form role="search" action="search.html" className="navbar-form">
                        <div className="form-group has-feedback">
                            <input type="text" placeholder="Type and hit enter ..." className="form-control"/>
                            <div data-search-dismiss="" className="fa fa-times form-control-feedback"></div>
                        </div>
                        <button type="submit" className="hidden btn btn-default">Submit</button>
                    </form>
                    {/* END Search form */}
                </nav>
                {/* END Top Navbar */}
            </header>
        );
    }

}

export default HomePageHeader;
