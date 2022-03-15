import React, { Component }  from "react";

// Display Error response
class ErrorResponse extends Component {
    render() {
        const message = this.state.error;

        return (
            <div>
                <span> Error occured from server : {message}. </span>
                <span>You may re-load the order system to submit your orders.</span>
                <button onClick="window.location.reload();">Retry</button>
            </div>
        );
    }
};

export default ErrorResponse;
