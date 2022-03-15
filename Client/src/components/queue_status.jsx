import React, { Component } from "react";

// Show queue waiting
class QueueStatus extends Component {
    
    render() {
        const {waiting_position, waiting_time} = this.state.queue;

        return (
            <div className="navbar-brand">
                <span>There are many user access to the system. Please be patient for us to serve you. </span>
                <span>This is an automated process, do not reload or refresh this page. </span>
                <span>Current position : {waiting_position}</span>
                <span>Estimate waiting time : Around {waiting_time} minutes</span>
            </div>
        );
    }
};

export default QueueStatus;
