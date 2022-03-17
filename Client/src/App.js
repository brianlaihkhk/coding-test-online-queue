import React, { Component } from "react";
import OrderForm from "./components/order_form";
import QueueStatus from "./components/queue_status";
import ErrorResponse from "./components/error_response";
import SuccessSubmit from "./components/success_submit";

const HOST = 'http://localhost:8081';

class App extends Component {

  state = {
    session : {"session" : "", "jwt_token" : ""},
    items : [],
    queue : {"in_queue" : true, "waiting_time" : 0, "waiting_position" : 0, "token_valid_until" : 0},
    order : {"user" : "" , "purchase" : []},
    error : null,
    milestone : 1
  };

  componentDidMount() {
    this.handleCall (null, HOST + "/item", "GET", null, this.handleItem, this.notSucessDisplayError);
    this.handleCall (null, HOST + "/session", "GET", null, this.handleSession, this.notSucessDisplayError);
  }

  handleCall = (e, url, method, request_header, successHandler, notSuccessHandler) => {
    if (e != null) {
      e.preventDefault();
    }

    var headers = {}
    Object.assign(headers, request_header)

    fetch(url, {
      method: method,
      headers: headers,
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit,
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    .then(response => response.json())
    .then(response => response.success ? successHandler(response.payload) : notSuccessHandler(response.payload))
    .catch(err => this.exceptionHandler(err));
  }

  handleItem = (payload) => {
    this.setState({ items : payload });
  }

  handleQueue = (payload) => {
    this.setState({ queue : payload });
    if (payload["in_queue"]){
      setTimeout(() => this.handleCall(null, HOST + "/status", "GET", {"Session" : this.state.session.session}, this.handleQueue, this.notSucessDisplayError), 5000);
    } else {
      this.setState({ milestone : 2 });
    }
  }

  submitOrder = (e, header) =>  {
    this.handleCall(e, HOST + "/order", "POST", header, this.successSubmit, this.notSucessDisplayError);
  }

  successSubmit = (payload) => {
    this.setState({ order : payload, milestone : 3 });
  }

  handleSession = (payload) => {
    this.setState({ session : payload });
    this.handleCall(null, HOST + "/status", "GET", {"Session" : payload.session}, this.handleQueue, this.notSucessDisplayError);
  }

  exceptionHandler = (err) => {
    console.log("exceptionHandler");
    this.setState({ error : "Internal Server Error", milestone : 0 });
  }

  notSucessDisplayError = (payload) => {
    console.log("notSucessDisplayError");
    console.log(payload);
    this.setState({ error : payload != null ? payload : "Connection Error", milestone : 0 });
  }

  render() {
    const {items, session, queue, order, error} = this.state;

    var is_waiting = (this.state.milestone === 1) ? 'block' : 'none';
    var is_finish_queue =  (this.state.milestone === 2) ? 'block' : 'none';
    var is_purchased = (this.state.milestone === 3) ? 'block' : 'none';
    var is_error = (this.state.milestone === 0) ? 'block' : 'none';  

    return (
      <div className="main__wrap">
        <main className="container">
          <QueueStatus display={is_waiting} queue={queue} />
          <OrderForm display={is_finish_queue} session={session} items={items} submitOrder={this.submitOrder}/>
          <SuccessSubmit display={is_purchased} order={order}/>
          <ErrorResponse display={is_error} error={error} />
        </main>
      </div>
    );
  }
}

export default App;
