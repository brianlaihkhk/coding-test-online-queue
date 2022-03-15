import React, { useEffect, Component } from "react";
import OrderForm from "./components/order_form";
import QueueStatus from "./components/queue_status";
import ErrorResponse from "./components/error_response";
import SuccessSubmit from "./components/success_submit";

const HOST = 'http://localhost:8081';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      session : {"session" : "", "jwt_token" : ""},
      items : [],
      queue : {"in_queue" : false, "waiting_time" : 0, "waiting_position" : 0, "token_valid_until" : 0},
      order : {"user" : "" , "purchase" : []},
      error : null
    };

    useEffect(() => {
      this.handleCall(null, HOST + "/item", "GET", null, this.handleItem, this.notSucessDisplayError);
      this.handleCall(null, HOST + "/session", "GET", null, this.handleSession, this.notSucessDisplayError);
    })  
  }


  handleCall (e, url, method, headers, successHandler, notSuccessHandler) {
    if (e != null) {
      e.preventDefault();
    }

    fetch(url, {
      "method": method,
      "headers": headers
    })
    .then(response => response.json())
    .then(response => response.success ? successHandler(response.payload) : notSuccessHandler(response.payload))
    .catch(err => this.exceptionHandler(err));
  }

  handleItem (payload) {
    this.setState({ items : payload });
  }

  handleQueue (payload) {
    this.setState({ queue : payload });
    if (payload["in_queue"]){
      setTimeout(this.handleCall(null, HOST + "/status", "GET", {"Session" : this.state.session.session}, this.handleQueue, this.notSucessDisplayError), 5000);
    }
  }

  handleOrder (payload) {
    this.setState({ order : payload });
  }

  submitOrder (e, header) {
    this.props.handleCall(e, HOST + "/order", "POST", header, this.successSubmit, this.notSucessDisplayError);
  }

  successSubmit (payload) {
    this.setState({ order : payload });
  }

  handleSession (payload) {
    this.setState({ session : payload });
    this.handleCall(null, HOST + "/status", "GET", {"Session" : payload.session}, this.handleQueue, this.notSucessDisplayError);
  }

  exceptionHandler (err) {
    this.setState({ error : "Internal Server Error" });
  }

  notSucessDisplayError (payload) {
    this.setState({ error : payload });
  }

  render() {
    const {items, session, queue, order, error} = this.state;

    var is_waiting = queue.in_queue && error == null;
    var is_finish_queue = !queue.in_queue && error == null;
    var is_purchased = order.purchase.length > 0 && error == null;
    var is_error = error != null;

    return (
      <div className="main__wrap">
        <main className="container">
          <QueueStatus display={is_waiting} />
          <OrderForm session={session} items={items} submitOrder={this.submitOrder} display={is_finish_queue} />
          <SuccessSubmit display={is_purchased}/>
          <ErrorResponse display={is_error}/>
        </main>
      </div>
    );
  }
}

export default App;
