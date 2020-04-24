import React, { Component } from "react";

// redux imports
import { connect } from "react-redux";
import { signUp, checkLogin } from "../../actions/auth";

class Signup extends Component {
  state = {};

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    if (
      this.state.username.includes(" ") ||
      this.state.password.includes(" ")
    ) {
      alert("No spaces allowed");
    } else if (this.state.username.length > 13) {
      alert(
        "Username cannot be bigger than 13 characters, sorry Mr. 'johnSmithTraderAccountTrackTrade123' "
      );
    } else {
      try {
        await this.props.signUp(this.state);
        await this.props.checkLogin();
        this.props.history.push("/home");
      } catch (err) {
        console.log(err);
      }
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
              <label for="username">Username</label>
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
              <label for="password">Password</label>
              <input
                onChange={this.handleChange}
                type="password"
                className="signup-form-input"
                name="password"
                required
              />
            </div>
            <button type="submit" className="signup-form-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if(state.auth){
    return { user: state.auth.data };
  }
  else return {}
};
export default connect(mapStateToProps, { signUp, checkLogin })(Signup);
