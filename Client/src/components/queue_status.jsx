import React, { Component } from "react";

// Show queue waiting
class QueueStatus extends Component {
    constructor(props){
        super(props);
        this.queue = props.queue;
        this.display = props.display;
    }

    render() {
        const {waiting_position, waiting_time} = this.queue;

        return (
            <div style={{display : this.display}}>
                <p>There are many user access to the system. Please be patient for us to serve you. </p>
                <p>This is an automated process, do not reload or refresh this page. </p>
                <p>Current position : {waiting_position}</p>
                <p>Estimate waiting time : Around {waiting_time} minutes</p>
            </div>
        );
    }
};

export default QueueStatus;
