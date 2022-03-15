import React, { Component }  from "react";

// Display Error response
class ErrorResponse extends Component {
    constructor(props){
        super(props);
        this.error = props.error;
    }
    

    render() {
        return (
            <div>
                <span> Error occured from server : {this.error}. </span>
                <span>You may re-load the order system to submit your orders.</span>
                <button onClick={() => window.location.reload(false)}>Retry</button>
            </div>
        );
    }
};

export default ErrorResponse;
