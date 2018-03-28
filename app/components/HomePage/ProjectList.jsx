/**
 Create Date: 3/24/18
 @author <a href="mailto:2210776504@qq.com">Liyuzhen</a>
 Description:used to show a list of project
 */

import React from 'react';
import HomePageHeader from './HomePageHeader';
import ApiClientBuilder from '../Util/ApiClientBuilder';

class ProjectList extends React.Component {
    constructor(props) {
        super(props)
    }
 

    render() {
	let apiClient = ApiClientBuilder.apiCLient;
let apiGroup = ApiClientBuilder.apiGroup;

let api = new apiGroup.AdmissionregistrationApi()

let callback = function(error, data, response) {
  if (error) {
    console.error(error);
	console.log("wrong=================")
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.getAdmissionregistrationAPIGroup(callback);
        return (
            <div>
			  <HomePageHeader/>
            jfkdfd
            </div>
        );
    }
}

export default ProjectList;