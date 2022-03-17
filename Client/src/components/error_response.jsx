import React, { Component }  from "react";

// Display Error response
class ErrorResponse extends Component {
 
    render() {
        return (
            <div style={{display : this.props.display}}>
                <p>Error occured from server : {this.error}. </p>
                <p>You may re-load the order system to submit your orders.</p>
                <button onClick={() => window.location.reload(false)}>Retry</button>
            </div>
        );
    }
};

export default ErrorResponse;
