import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            password2: "",
            name: '',
            // hasAgreed: false
            errors:{}
        };

    }
    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
  
    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
  
    onSubmit = e => {
      e.preventDefault();
  
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
  
      this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
        <div className="FormCenter">
            <form noValidate onSubmit={this.onSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input autoComplete="new-password" type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.onChange} error={errors.name}/>
                <div>
                  <span style={{color: "red"}}>
                    {errors.name}
                  </span>
                </div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input autoComplete="new-password" type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange} error={errors.password}/>
                <div>
                  <span style={{color: "red"}}>
                    {errors.password}
                  </span>
                </div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Renter Password</label>
                <input autoComplete="new-password" type="password" id="password2" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password2} onChange={this.onChange} error={errors.password2}/>
                <div>
                  <span style={{color: "red"}}>
                    {errors.password2}
                  </span>
                </div>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input autoComplete="new-password" type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.onChange} error={errors.email}/>
                <div>
                <span style={{color: "red"}}>
                  {errors.email}
                </span>
                </div>
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        );
    }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
