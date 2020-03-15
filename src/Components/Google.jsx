import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Budget from "./Budget.jsx";

class Google extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", login: false };
  }

  render() {
    const responseGoogle = response => {
      //sets name to user name
      this.setState({ name: response.profileObj.name, login: true });
    };

    return (
      <div className="center">
        <Router>
          <Route exact={true} path="/">
            {!this.state.login ? (
              <GoogleLogin
                clientId="154249222110-kdngkn4dtc1jsgt7bvelgm975mcbjtkm.apps.googleusercontent.com"
                buttonText="Signin with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                redirectUri={"/budget"}
                cookiePolicy={"single_host_origin"}
              />
            ) : (
              <Redirect to="/budget" />
            )}
          </Route>

          <Route path="/budget">
            <Budget name={this.state.name} />
          </Route>
          {/*  <Route exact={true} path="/"> <Google /></Route> */}
        </Router>
      </div>
    );
  }
}
export default Google;
