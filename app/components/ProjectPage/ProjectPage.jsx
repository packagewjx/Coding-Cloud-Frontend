import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Header from './ProjectPageHeader'
import Sidebar from './Sidebar'
import Offsidebar from '../Layout/Offsidebar'
import Footer from './ProjectPageFooter'

class ProjectPage extends React.Component {

    render() {

        // Animations supported
        //      'rag-fadeIn'
        //      'rag-fadeInUp'
        //      'rag-fadeInDown'
        //      'rag-fadeInRight'
        //      'rag-fadeInLeft'
        //      'rag-fadeInUpBig'
        //      'rag-fadeInDownBig'
        //      'rag-fadeInRightBig'
        //      'rag-fadeInLeftBig'
        //      'rag-zoomBackDown'

        const animationName = 'rag-fadeIn';

        return (
            <div className="wrapper">
                <Header />

                <Sidebar />

                <Offsidebar />

                <CSSTransitionGroup
                    component="section"
                    transitionName={animationName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </CSSTransitionGroup>

                <Footer />
            </div>
        );
    }

}

export default ProjectPage;
