import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";


class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = { name: this.props.name};
  }

  render() {
      return(<div>Welcome to your monthly budget {this.state.name} </div>)
  }

}
export default Budget;