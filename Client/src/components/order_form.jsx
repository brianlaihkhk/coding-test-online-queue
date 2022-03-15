import React from "react";
import UserForm from "./user_form";
import Item from "./item";
var jwt = require('jwt-simple');

// User Contact Form
const OrderForm = (props) => {
  cart = new Map();
  user = {}

  updateItem = (item) => {
    this.cart.set(item.key, item.quantity);
  }

  updateUser = (key, value) => {
    this.user[key] = value;
  }

  convertPurchase = (session) => {
    jwt = session.jwt_token
    purchase = []
    cart.map((key, quantity) => purchase.append({"item_uuid" : key , "quantity" : quantity}))

    jwt_message = jwt.decode({"user" : user, "purchase" : purchase}, jwt);
    return {"Session" : session.session, "Authorization" : jwt_message}
  }

  submitPurchase = (e) => {
    header = convertPurchase(this.props.session);
    this.props.submitOrder(e, header);
  }

  return (
      <div>
        {props.items.map((item) => {
            <Item key={item.item_uuid}
                  name={item.item_name} 
                  description={item.item_description}
                  price={item.price}
                  updateItem={updateItem} />
          })                            
        }

        <UserForm 
          updateUser={this.updateUser}>
        </UserForm>

        <Button onSubmit={this.submitPurchase} />        
      </div>
      
  );

};


export default OrderForm;