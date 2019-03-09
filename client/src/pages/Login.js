import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
  
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
  
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
  
      this.props.loginUser(userData);
    };

    render() {
        console.log(this.props)
        const { errors } = this.state;
        return (
        <div className="FormCenter">
            <form noValidate className="FormFields" onSubmit={this.onSubmit}>
            <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input onChange={this.onChange} autoComplete="new-password" type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} error={errors.email}/>
                <div>
                  <span style={{color: "red"}}>
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </div>
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input autoComplete="new-password" type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange} error={errors.password} />
              </div>
              <div>
                <span style={{color: "red"}}>
                    {errors.password}
                    {errors.passwordincorrect}
                </span>
              </div>
              <div className="FormField">
                  <button className="FormField__Button mr-20">Sign In</button> <Link to="/sign-up" className="FormField__Link">Create an account</Link>
              </div>
            </form>
          </div>
        );
    }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
