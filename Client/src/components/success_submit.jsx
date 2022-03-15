import React, { Component }  from "react";

// Display Success message
class SuccessSubmit extends Component {
    constructor(props){
        super(props);
        this.order = props.order;
    }

    render() {
        const {user, purchase} = this.order;

        return (
            <div>
                <span> Thank you for your order. </span>
                <span>User order id : {user}</span>
                <span>Total item purchased : {purchase.length}</span>
                <button onClick={() => window.location.reload(false)}>Re-order again</button>
            </div>
        );
    }
};

export default SuccessSubmit;
