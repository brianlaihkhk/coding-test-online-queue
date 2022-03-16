import React, { Component }  from "react";

// Display Success message
class SuccessSubmit extends Component {
    constructor(props){
        super(props);
        this.order = props.order;
        this.display = props.display;
    }

    render() {
        const {user, purchase} = this.order;

        return (
            <div style={{display : this.display}}>
                <p> Thank you for your order. </p>
                <p>User order id : {user}</p>
                <p>Total item purchased : {purchase.length}</p>
                <button onClick={() => window.location.reload(false)}>Re-order again</button>
            </div>
        );
    }
};

export default SuccessSubmit;
