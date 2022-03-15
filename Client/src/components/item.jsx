import React, {Component} from "react";

// Item

class Item extends Component {
  constructor(props) {
    super(props)
    this.key = props.key;
    this.updateItem = props.updateItem;
  }

  updateQuantity = (e) => {
    var item = {};
    item['key'] = this.key;
    item['quantity'] = e.target.value;
    this.updateItem(item);
  }

  render() {
    return (
        <div>
          <span>Item : {this.props.name} </span>
          <span>Description : {this.props.description} </span>
          <span>Price : {this.props.price} </span>
          <span>Enter the quantity to purchase : <input type="text" name="quantity" onChange={this.updateQuantity} /></span>
        </div>
    );
  }
};

export default Item;
