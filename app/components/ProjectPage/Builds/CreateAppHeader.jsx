
import React from 'react';

class CreateAppHeader extends React.Component {
    constructor() {
        super();

    }
    render() {
       switch(this.props.step)
       {
           case 1:
               return (
                   <div>
                       <h1>Information</h1>
                   </div>
               );
               break;
           case 2:
               return(
                   <div>
                       <h1>Configuration</h1>
                   </div>
               );
               break;
           case 3:
               return (
                   <div>
                       <h1>Results</h1>
                   </div>
               )
           break;
           default:
               return (
                   <div>
                       <h1>fault</h1>
                   </div>
               )
               console.log("when create app, this.props.step get fasle value");
               break;
       }
    }
}

export default CreateAppHeader