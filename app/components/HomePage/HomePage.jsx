/**
 Create Date: 1/23/18
 @author <a href="mailto:wu812730157@gmail.com">Wujunxian</a>
 Description:User home page, use to select project and browse catalog.
 */

import React from 'react';
import HomePageHeader from "./HomePageHeader";
import CatalogBrowser from "./CatalogBrowser";
import ProjectBrowser from "./ProjectBrowser";
import Offsidebar from "../Layout/Offsidebar";
import {Col , Row} from "react-bootstrap";

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <HomePageHeader/>

                    <Row>
                        <Col md={8}>
                            <CatalogBrowser/>
                        </Col>
                        <Col md={4}>
                        <ProjectBrowser />
                        </Col>
                    </Row>

                <Offsidebar/>
            </div>
        )
    }
}

export default HomePage;