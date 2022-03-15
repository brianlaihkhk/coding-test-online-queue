import React, { Component } from "react";

// Item

const Item = (props) => {

  updateQuantity = (e) => {
    var item = {};
    item['key'] = props.key;
    item['quantity'] = e.target.value;
    this.props.updateItem(item);
  }

  return (
      <div>
        <span>Item : {props.name} </span>
        <span>Description : {props.description} </span>
        <span>Price : {props.price} </span>
        <span>Enter the quantity to purchase : <input type="text" name="quantity" onChange={this.updateQuantity} /></span>
      </div>
  );
};

export default Item;
