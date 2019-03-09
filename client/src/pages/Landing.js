import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="center-align">
            <h4>
              <b>Basic User authentication page</b>
            </h4>
            <br />
            <div className="col s6">
            <div className="FormField">
                  <Link to="sign-in"><button className="FormField__Button mr-20">Sign In</button></Link>
                  <Link to="/sign-up" className="FormField__Link">Create an account</Link>
              </div>
            </div>
            <div className="col s6">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;