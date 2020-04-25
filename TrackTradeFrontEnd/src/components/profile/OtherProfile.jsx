import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ShowIdeas from "./ShowIdeas";
import ShowTrades from "./ShowTrades";
import ShowStats from "./ShowStats";

//redux imports
import { connect } from "react-redux";
import { findOtherProfile } from "../../actions";
import { addConnection, removeConnection } from "../../actions/connections.js";
import { fetchAllMessages, sendMessage } from "../../actions/messages.js";
import { checkLogin } from "../../actions/auth.js";

class OtherProfile extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {
      display: "ideas",
    };
  }

  async componentDidMount() {
    await this.props.findOtherProfile({
      username: this.props.match.params.otheruser,
    });

    await this.props.fetchAllMessages();

    await this.props.checkLogin();
    if (this.props.otherProfile) {
      if (this.props.match.params.otheruser !== this.props.username) {
        if (this.props.otherProfile.userdata[0] && this.props.actualUser) {
          if (
            this.props.actualUser.connections.includes(
              this.props.otherProfile.userdata[0]._id
            )
          ) {
            this.setState({ connected: true });
          } else {
            this.setState({ connected: false });
          }
          // console.log(this.state.connected)
        } else {
          this.setState({ connected: false });
        }
      }
    }

    if (this.state.allMessages) {
      let actualMessages = this.props.allMessages.data.filter((eachMessage) => {
        return (
          eachMessage.sender === this.props.actualUser._id ||
          eachMessage.receiver === this.props.actualUser._id
        );
      });
      this.setState({ actualMessages });
    }
  }

  displayStuff = () => {
    if (this.state.display) {
      if (this.state.display === "ideas") {
        return (
          <ShowIdeas otherProfile={true} />
        );
      } else if (this.state.display === "trades") {
        return <ShowTrades trades={this.state.trades} otherProfile={true} />;
      } else if (this.state.display === "stats") {
        return <ShowStats trades={this.state.trades} otherProfile={true} />;
      }
    } else {
      return <ShowIdeas otherProfile={true} />;
    }
  };

  imageLoad = () => {
    // console.log(this.props.avatar)
    return this.props.otherProfile.userdata[0].avatar ? (
      <img
        className="profile-nav__user-avatar__image"
        src={this.props.otherProfile.userdata[0].avatar}
        alt="Avatar"
      />
    ) : (
      <div className="profile-nav__user-avatar__image-default"></div>
    );
  };

  connectUser = async (userID) => {
    console.log(userID);
    try {
      await this.props.addConnection({ userID });
      // window.location.reload()
      this.setState({ connected: true });
    } catch (err) {
      console.log(err);
    }
  };

  disconnectUser = async (userID) => {
    console.log(userID);
    try {
      await this.props.removeConnection({ userID });
      // window.location.reload()
      this.setState({ connected: false });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendMessage = async (e) => {
    e.preventDefault();
    console.log(this.state);
    this.input.current.value = "";
    try {
      await this.props.sendMessage({
        message: this.state.message,
        otherProfile: this.props.otherProfile.userdata[0]._id,
      });
    } catch (err) {
      console.log(err);
    }
    if (this.props.actualUser) {
      let actualMessages = this.props.allMessages.data.filter((eachMessage) => {
        return (
          eachMessage.sender === this.props.actualUser._id ||
          eachMessage.receiver === this.props.actualUser._id
        );
      });
      this.setState({ actualMessages });
    }
  };

  showMessages = () => {
    if (this.props.allMessages && this.props.actualUser) {
      return (
        <div className="chatbox" id="chatbox">
          <div className="chatbox__content" id="content">
            <div className="chatbox__top">
              <div className="chatbox__top-avatar profile-nav__user-avatar">
                {this.imageLoad()}
                <div className="profile-nav__user-avatar__image-default"></div>
              </div>
              <h1 className="profile-nav__user-username">
                {this.props.otherProfile.userdata[0].username}
              </h1>
            </div>
            <div className="chatbox__middle">
              <div className="chatbox__middle-content">
                <a href="#main" className="chatbox__close">
                  &times;
                </a>

                {this.props.allMessages.data.map((eachMessage) => {
                  if (
                    eachMessage.sender === this.props.actualUser._id &&
                    eachMessage.receiver ===
                      this.props.otherProfile.userdata[0]._id
                  ) {
                    return (
                      <div className="chatbox__middle-bubble chatbox__middle-bubble-sender">
                        {eachMessage.content}
                      </div>
                    );
                  } else if (
                    eachMessage.receiver === this.props.actualUser._id &&
                    eachMessage.sender ===
                      this.props.otherProfile.userdata[0]._id
                  ) {
                    return (
                      <div className="chatbox__middle-bubble chatbox__middle-bubble-receiver">
                        {eachMessage.content}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="chatbox__bottom">
              <form
                onSubmit={this.sendMessage}
                className="chatbox__bottom-form"
              >
                <textarea
                  onChange={this.handleChange}
                  ref={this.input}
                  type="text"
                  name="message"
                  className="chatbox__bottom-form-message"
                  placeholder="Type your message"
                  required
                />
                <button className="chatbox__bottom-form-submit" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    console.log(this.props, "props");
    if (this.props.actualUser) {
      if (
        this.props.match.params.otheruser !==
        this.props.actualUser.username
      ) {
        return this.props.otherProfile ? (
          <div>
            <Header {...this.props} loggedIn={true} />
            <div className="profile">
              <div className="profile-nav">
                <div className="profile-nav__user">
                  <div className="profile-nav__user-avatar">
                    {this.imageLoad()}
                    <div className="profile-nav__user-avatar__image-default"></div>
                  </div>
                  <h1 className="profile-nav__user-username">
                    {this.props.otherProfile.userdata[0].username}
                  </h1>
                  <div className="profile-nav__links-other">
                    {this.state.connected ? (
                      <div
                        onClick={() =>
                          this.disconnectUser(
                            this.props.otherProfile.userdata[0]._id
                          )
                        }
                        className="profile-nav__links-text-profile"
                      >
                        Disconnect
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          this.connectUser(
                            this.props.otherProfile.userdata[0]._id
                          )
                        }
                        className="profile-nav__links-text-profile"
                      >
                        Connect
                      </div>
                    )}

                    <a
                      href="#chatbox"
                      className="profile-nav__links-text-profile"
                    >
                      Message
                    </a>
                  </div>
                </div>
                <ul className="profile-nav__links">
                  <div className="profile-nav__links-flex">
                    <li
                      className={
                        this.state.display === "ideas"
                          ? "profile-nav__links-text-active"
                          : "profile-nav__links-text"
                      }
                      onClick={() => this.setState({ display: "ideas" })}
                    >
                      <i className="fas fa-lightbulb profile-nav__links-phone"></i>
                      <span className="profile-nav__links-desktop">Ideas</span>
                    </li>

                    <li
                      className={
                        this.state.display === "trades"
                          ? "profile-nav__links-text-active"
                          : "profile-nav__links-text"
                      }
                      onClick={() => this.setState({ display: "trades" })}
                    >
                      <i className="fas fa-dollar-sign profile-nav__links-phone"></i>
                      <span className="profile-nav__links-desktop">Trades</span>
                    </li>

                    <li
                      className={
                        this.state.display === "stats"
                          ? "profile-nav__links-text-active"
                          : "profile-nav__links-text"
                      }
                      onClick={() => this.setState({ display: "stats" })}
                    >
                      <i className="fas fa-chart-line profile-nav__links-phone"></i>
                      <span className="profile-nav__links-desktop">Stats</span>
                    </li>
                  </div>
                </ul>
              </div>
              <div className="profile-content">
                {this.displayStuff()}
                {this.showMessages()}
              </div>
            </div>
            <Footer />
          </div>
        ) : (
          <div>hello</div>
        );
      } else {
        return <Redirect to="/profile" />;
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  if (state.auth) {
    console.log("state", state)
    return {
      otherProfile: state.otherProfile,
      allMessages: state.messages,
      actualUser: state.auth.data,
    };
  } else
    return { otherProfile: state.profiles, allMessages: state.messages };
};

export default connect(mapStateToProps, {
  findOtherProfile,
  fetchAllMessages,
  sendMessage,
  addConnection,
  removeConnection,
  checkLogin,
})(OtherProfile);
