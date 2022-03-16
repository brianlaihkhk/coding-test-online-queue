import React, { Component }  from "react";

// Display Success message
class SuccessSubmit extends Component {
    render() {
        const {user, purchase} = this.props.order;

        return (
            <div style={{display : this.props.display}}>
                <p> Thank you for your order. </p>
                <p>User order id : {user}</p>
                <p>Total item purchased : {purchase.length}</p>
                <button onClick={() => window.location.reload(false)}>Re-order again</button>
            </div>
        );
    }
};

export default SuccessSubmit;
