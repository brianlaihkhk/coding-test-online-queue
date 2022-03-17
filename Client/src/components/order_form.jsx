import React, {Component, } from "react";
import UserForm from "./user_form";
import Item from "./item";
var jwt = require('jwt-simple');

// User Contact Form
class OrderForm extends Component {
  constructor(props){
    super(props);
    this.cart = new Map();
    this.user = new Map();
  }

  state = {
    formErrorMessage : "",
    orderTotal : 0
  }

  getCart() {
    return this.cart;
  }

  getUser() {
    return this.user;
  }

  calculateTotalAmount = (items) => {
    var total = 0;
    items.forEach((item) => { total += this.cart.get(item.item_uuid) == null ? 0 : this.cart.get(item.item_uuid) * item.price });
    return total;
  }

  updateItem = (item) => {
    if (item != null && item.uuid != null){
      if (item.quantity > 0) {
        this.cart.set(item.uuid, item.quantity);
      } else {
        this.cart.delete(item.uuid);
      }
    }
    this.setState({ orderTotal : this.calculateTotalAmount(this.props.items)});
  }

  updateUser = (key, value) => {
    if (value == null || !value){
      this.user.delete(key);
    } else {
      this.user.set(key, value);
    }
  }

  convertPurchase = (session) => {
    var purchase = []
    this.cart.forEach((quantity, key) => purchase.push({"item_uuid" : key , "quantity" : quantity}))

    var jsonObject = {"user" : Object.fromEntries(this.user), "purchase" : purchase}
    var jwtMessage = jwt.encode(jsonObject, session.jwt_token);
    return {"Session" : session.session, "Authorization" : "Bearer " + jwtMessage}
  }

  validateForm () {
    if (this.cart.size < 1){
      this.setState({ formErrorMessage : "Please select at least 1 item to purchase"});
      return false;
    } else if (this.user.size < 4){
      this.setState({ formErrorMessage : "Please input all the fields"});
      return false;
    } else if (this.user.size < 4){
      this.setState({ formErrorMessage : "Please input all the fields"});
      return false;
    } else if (this.user.get("first_name") == null || this.user.get("first_name") == undefined || !this.validateLetterAndSpace(this.user.get("first_name"))){
      this.setState({formErrorMessage : "First Name format is incorrect"});
      return false;
    } else if (this.user.get("last_name") == null || this.user.get("last_name") == undefined  || !this.validateLetterAndSpace(this.user.get("last_name"))){
      this.setState({formErrorMessage : "Last Name format is incorrect"});
      return false;
    } else if (this.user.get("email") == null || this.user.get("email") == undefined  || !this.validateEmail(this.user.get("email"))){
      this.setState({formErrorMessage : "Email format is incorrect"});
      return false;
    } else if (this.user.get("mobile") == null || this.user.get("mobile") == undefined  || !this.validateNumbers(this.user.get("mobile"))){
      this.setState({formErrorMessage : "Mobile format is incorrect"});
      return false;
    }
    return true;
  }

  validateLetterAndSpace = (letter) => {
    return letter.match(
      /^[a-zA-Z\s]*$/
    );
  };

  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  validateNumbers = (numbers) => {
    return numbers.match(
      /^\d+$/
    );
  };

  submitPurchase = (e) => {
    if (this.validateForm()){
      var header = this.convertPurchase(this.props.session);
      this.props.submitOrder(e, header);
    }
  }

  render() {
    return (
        <div style={{display : this.props.display}}>
          { this.props.items.map(item => {
            return <Item key={item.item_uuid}
                         item={item}
                         updateItem={this.updateItem} />
            })
          }
          <p>Total amount : {this.state.orderTotal}</p>

          <UserForm 
            updateUser={this.updateUser}>
          </UserForm>
          <p>{this.state.formErrorMessage}</p>
          <button onClick={this.submitPurchase} >Submit</button>        
        </div>
        
    );
  }
};


export default OrderForm;