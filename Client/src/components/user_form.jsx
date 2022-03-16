import React, { Component } from "react";

// User Contact Form
class UserForm extends Component {

  constructor(props) {
    super(props);
    this.updateUser = props.updateUser;
  }  

  formChange = (e) => {
    console.log(e.target.value);
    if (e != null && e.target != null && e.target.name != null) {
      this.updateUser(e.target.name, e.target.value == null ? "" : e.target.value);
    }
  }

  render(){
    return (
      <div style={{display: 'block' }}>
        <p>Contact information</p>
        <p>First name : <input type="text" name="first_name" onChange={this.formChange} /></p>
        <p>Last name : <input type="text" name="last_name" onChange={this.formChange} /></p>
        <p>Email : <input type="text" name="email" onChange={this.formChange} /></p>
        <p>Mobile : <input type="text" name="mobile" onChange={this.formChange} /></p>

      </div>
    )
  }
};


export default UserForm;