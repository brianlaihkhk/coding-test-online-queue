import React, {Component} from "react";
import UserForm from "./user_form";
import Item from "./item";
var jwt = require('jwt-simple');

// User Contact Form
class OrderForm extends Component {
  constructor(props){
    super(props);
    this.cart = new Map();
    this.user = {};
    this.session = props.session;
    this.submitOrder = props.submitOrder;
  }

  updateItem = (item) => {
    this.cart.set(item.key, item.quantity);
  }

  updateUser = (key, value) => {
    this.user[key] = value;
  }

  convertPurchase = (session) => {
    var jwt = session.jwt_token
    var purchase = []
    this.cart.map((key, quantity) => this.purchase.append({"item_uuid" : key , "quantity" : quantity}))

    var jwt_message = jwt.decode({"user" : this.user, "purchase" : purchase}, jwt);
    return {"Session" : session.session, "Authorization" : jwt_message}
  }

  submitPurchase = (e) => {
    var header = this.convertPurchase(this.session);
    this.submitOrder(e, header);
  }

  render() {
    return (
        <div>
          {this.props.items.map((item) => {
              return <Item key={item.item_uuid}
                        name={item.item_name} 
                        description={item.item_description}
                        price={item.price}
                        updateItem={this.updateItem} />
            })                            
          }

          <UserForm 
            updateUser={this.updateUser}>
          </UserForm>

          <button onSubmit={this.submitPurchase} />        
        </div>
        
    );
  }
};


export default OrderForm;