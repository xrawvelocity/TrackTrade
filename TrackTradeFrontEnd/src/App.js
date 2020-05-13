import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// component imports
import Landing from "./components/home/Landing";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import PostIdea from "./components/profile/PostIdea";
import PostTrade from "./components/profile/PostTrade";
import Profile from "./components/profile/Profile";
import OtherProfile from "./components/profile/OtherProfile";
import Tools from "./components/tools/Tools";

// redux imports
import { connect } from "react-redux";
import { checkLogin } from "./actions/auth";

class App extends Component {
  state = {};

  async componentDidMount() {
    await this.props.checkLogin();
    console.log(this.props);
  }

  render() {
    return (
      <div>
        {this.props.user ? (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} />}
            ></Route>

            <Route
              exact
              path="/home"
              render={(props) => <Home {...props} />}
            ></Route>

            <Route
              exact
              path="/sign-up"
              render={(props) => <SignUp {...props} />}
            ></Route>

            <Route
              exact
              path="/log-in"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route
              exact
              path="/profile/:otheruser"
              render={(props) => <OtherProfile {...props} />}
            ></Route>

            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} />}
            ></Route>

            <Route
              exact
              path="/postIdea"
              render={(props) => <PostIdea {...props} />}
            ></Route>

            <Route
              exact
              path="/postTrade"
              render={(props) => <PostTrade {...props} />}
            ></Route>

            <Route
              exact
              path="/tools"
              render={(props) => <Tools {...props} />}
            ></Route>

            <Route component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Landing {...props} />}
            ></Route>

            <Route
              exact
              path="/home"
              render={(props) => <Landing {...props} />}
            ></Route>

            <Route
              exact
              path="/sign-up"
              render={(props) => <SignUp {...props} />}
            ></Route>

            <Route
              exact
              path="/log-in"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route
              exact
              path="/profile/:otheruser"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route
              exact
              path="/profile"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route
              exact
              path="/postIdea"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route
              exact
              path="/postTrade"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route
              exact
              path="/tools"
              render={(props) => <LogIn {...props} />}
            ></Route>

            <Route component={NotFound} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.auth) {
    return { user: state.auth.data };
  } else return {};
};
export default connect(mapStateToProps, { checkLogin })(App);
