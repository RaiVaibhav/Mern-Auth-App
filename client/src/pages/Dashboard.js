import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    console.log(this.props)
    const { user } = this.props.auth;

    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="center-align">
              <h4>
                <b>Hello</b> {user.name}
              </h4>
              <br />
              <div className="col s6">
                <div className="FormField">
                    <button onClick={this.onLogoutClick} className="FormField__Button mr-20">Log out</button>
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

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);