import React, {Component} from "react";

// Item

class Item extends Component {

  updateQuantity = (e) => {
    this.props.updateItem({ uuid : this.props.item.item_uuid, quantity : e.target.value});
  }

  render() {
    const {item_name, item_description, price} = this.props.item;
    return (
        <div className="item">
          <p>Item : {item_name} </p>
          <p>Description : {item_description} </p>
          <p>Price : {price} </p>
          <p>Enter the quantity to purchase : 
            <select name="quantity" onChange={this.updateQuantity}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select></p>
        </div>
    );
  }
};

export default Item;
