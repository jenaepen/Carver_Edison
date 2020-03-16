import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import Budget from "./Budget.jsx";

/**
 * Google class uses "react-google-login" for google oAuth and for the user to login.
 * The oAuth works for localhost 8080.
 * responseGoogle function receives whether or not the response was successful
 * Google provides a response object filled with the user information if it was successfull.
 * The user firstname is taken from the response object and passed along to
 * Budget component while setting the "login" state to true.
 * The login state indicates if the user needs to login or should be transfer over to the budget page
 * If login is true, the user is transfered to the Budget page / component
 *
 * The Google class returns either the google oAuth button or Budget Component
 */
class Google extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", login: false };
  }

  render() {
    const responseGoogle = response => {
      if (response.profileObj)
        this.setState({ name: response.profileObj.givenName, login: true });
    };

    return (
      <div className="center">
        {!this.state.login ? (
          <GoogleLogin
            clientId="154249222110-kdngkn4dtc1jsgt7bvelgm975mcbjtkm.apps.googleusercontent.com"
            buttonText="Signin with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        ) : (
          <Budget name={this.state.name} />
        )}
      </div>
    );
  }
}
export default Google;
