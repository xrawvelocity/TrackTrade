import React, { Component } from "react";

// redux imports
import { connect } from "react-redux";
import { logIn, checkLogin } from "../../actions/auth";

class Login extends Component {
  state = {};

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await this.props.logIn(this.state);
      await this.props.checkLogin();
      this.props.history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="signuppage">
        <div className="navigation">
          <a href="/" className="navigation--brand">
            Track Trade
          </a>
        </div>
        <div className="signup">
          <form className="signup-form" onSubmit={this.handleSubmit}>
            <div className="signup-form-group">
              <label htmlFor="email">Username</label>
              <input
                onChange={this.handleChange}
                type="text"
                className="signup-form-input"
                placeholder="smithjohntrades123"
                name="username"
                required
              />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handleChange}
                type="password"
                className="signup-form-input"
                name="password"
                required
              />
            </div>
            <button type="submit" className="signup-form-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return { user: state.logIn };
};

export default connect(mapStateToProps, { logIn, checkLogin })(Login);
