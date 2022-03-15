import React from "react";

// User Contact Form

const UserForm = (props) => {

  formChange = (e) => {
    this.props.updateUser(e.target.name, e.target.value);
  }

  return (
    <div>
      <span>Contact information</span>
      <span>First name : <input type="text" name="first_name" onChange={this.formChange} /></span>
      <span>Last name : <input type="text" name="last_name" onChange={this.formChange} /></span>
      <span>Email : <input type="text" name="email" onChange={this.formChange} /></span>
      <span>Mobile : <input type="text" name="mobile" onChange={this.formChange} /></span>

    </div>
  )

};


export default UserForm;