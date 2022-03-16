import React, {Component} from "react";
import UserForm from "./user_form";
import Item from "./item";
var jwt = require('jwt-simple');

// User Contact Form
class OrderForm extends Component {
  constructor(props){
    super(props);
    this.cart = new Map();
    this.user = new Map();
    this.session = props.session;
    this.submitOrder = props.submitOrder;
    this.display = props.display;

  }

  updateItem = (item) => {
    if (item != null && item.uuid != null && item.quantity != null){
      this.cart.set(item.uuid, item.quantity);
    }
  }

  updateUser = (key, value) => {
    if (key != null && value != null){
      this.user.set(key, value);
    }
  }

  convertPurchase = (session) => {
    var jwt_token = session.jwt_token
    var purchase = []
    Object.keys(this.cart).map((key, quantity) => this.purchase.append({"item_uuid" : key , "quantity" : quantity}))

    var jwt_message = jwt.decode({"user" : this.user, "purchase" : purchase}, jwt_token);
    return {"Session" : session.session, "Authorization" : jwt_message}
  }

  submitPurchase = (e) => {
    console.log(this.session);

    var header = this.convertPurchase(this.session);
    this.submitOrder(e, header);
  }

  render() {

    return (
        <div style={{display : this.display}}>
          {this.props.items.map((item) => {
            return <Item key={item.item_uuid}
                        uuid={item.item_uuid}
                        name={item.item_name} 
                        description={item.item_description}
                        price={item.price}
                        updateItem={this.updateItem} />
            })                            
          }

          <UserForm 
            updateUser={this.updateUser}>
          </UserForm>

          <button onClick={this.submitPurchase} >Submit</button>        
        </div>
        
    );
  }
};


export default OrderForm;