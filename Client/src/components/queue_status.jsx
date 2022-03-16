import React, { Component } from "react";

// Show queue waiting
class QueueStatus extends Component {

    render() {
        const {waiting_position, waiting_time, total_user} = this.props.queue;

        return (
            <div style={{display : this.props.display}}>
                <p>There are many user access to the system. Please be patient for us to serve you. </p>
                <p>This is an automated process, do not reload or refresh this page. </p>
                <p>Total users in the system : {total_user}</p>
                <p>Your waiting position : {waiting_position}</p>
                <p>Estimate waiting time : Around {waiting_time} minutes</p>
            </div>
        );
    }
};

export default QueueStatus;
