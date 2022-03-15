import React, { Component }  from "react";

// Display Success message
class SuccessSubmit extends Component {
    render() {
        const {user, purchase} = this.state.order;

        return (
            <div>
                <span> Thank you for your order. </span>
                <span>User order id : {user}</span>
                <span>Total item purchased : {purchase.length}</span>
                <button onClick="window.location.reload();">Re-order again</button>
            </div>
        );
    }
};

export default SuccessSubmit;
