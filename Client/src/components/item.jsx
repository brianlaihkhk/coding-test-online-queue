import React, {Component} from "react";

// Item

class Item extends Component {
  constructor(props) {
    super(props)
    this.uuid = props.uuid;
    this.updateItem = props.updateItem;
  }

  updateQuantity = (e) => {
    this.updateItem({ uuid : this.uuid, quantity : e.target.value});
  }

  render() {
    return (
        <div style={{ display: 'inline-block', width: '300px', height: '300px', border: '1px solid', margin: '20px 20px', padding: '20px 20px'}}>
          <p>Item : {this.props.name} </p>
          <p>Description : {this.props.description} </p>
          <p>Price : {this.props.price} </p>
          <p>Enter the quantity to purchase : <input type="text" name="quantity" onChange={this.updateQuantity} /></p>
        </div>
    );
  }
};

export default Item;
