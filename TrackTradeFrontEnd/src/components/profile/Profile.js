import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ShowIdeas from "./ShowIdeas";
import ShowTrades from "./ShowTrades";
import ShowStats from "./ShowStats";
import Messages from "./Messages";
import Connections from "./Connections";

// redux imports
import { connect } from "react-redux";
import { updateAvatar } from "../../actions";
import { checkLogin } from "../../actions/auth";

class Profile extends Component {
  state = {
    display: "ideas",
  };

  async componentDidMount() {
    await this.props.checkLogin();
    console.log(this.props);
  }

  displayStuff = () => {
    if (this.state.display) {
      if (this.state.display === "ideas") {
        return <ShowIdeas />;
      } else if (this.state.display === "trades") {
        return <ShowTrades />;
      } else if (this.state.display === "stats") {
        return <ShowStats />;
      } else if (this.state.display === "messages") {
        return <Messages />;
      } else if (this.state.display === "connections") {
        return <Connections user={this.props.user} />;
      }
    } else {
      return <ShowIdeas />;
    }
  };

  handleSubmit = async (e) => {
    //console.log("SUBMITTED BABY!!!!!!!!!",  e.target.files[0])
    const uploadData = new FormData();
    await uploadData.append("imageUrl", e.target.files[0]);

    try {
      await this.props.updateAvatar(uploadData);
      await this.props.checkLogin();
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  imageLoad = () => {
    return this.props.user.avatar ? (
      <img
        className="profile-nav__user-avatar__image"
        src={this.props.user.avatar}
        alt="Avatar"
      />
    ) : (
      <div className="profile-nav__user-avatar__image-default"></div>
    );
  };

  // changeProfileState = ()

  render() {
    return (
      <div>
        <Header isProfile={true} loggedIn={true} />
        <div className="profile">
          <div className="profile-nav">
            <div className="profile-nav__user">
              <div className="profile-nav__user-avatar">
                {this.imageLoad()}

                <div className="profile-nav__user-avatar__change">
                  <form className="profile-nav__user-avatar__change-form">
                    <label
                      className="profile-nav__user-avatar__change-form--label"
                      htmlFor="img"
                    >
                      Change Avatar
                    </label>
                    <input
                      className="profile-nav__user-avatar__change-form--input"
                      onChange={this.handleSubmit}
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                    />
                  </form>
                </div>
              </div>
              <h1 className="profile-nav__user-username">
                {this.props.user.username}
              </h1>
            </div>
            <ul className="profile-nav__links">
              {this.state.display === "ideas" ? (
                <li className="profile-nav__links-text">
                  <Link className="profile-nav-link" to="/postIdea">
                    Post Idea
                  </Link>
                </li>
              ) : null}
              {this.state.display === "trades" ? (
                <li className="profile-nav__links-text">
                  <Link className="profile-nav-link" to="/postTrade">
                    Post Trade
                  </Link>
                </li>
              ) : null}
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

                <li
                  className={
                    this.state.display === "messages"
                      ? "profile-nav__links-text-active"
                      : "profile-nav__links-text"
                  }
                  onClick={() => this.setState({ display: "messages" })}
                >
                  <i className="fas fa-comments profile-nav__links-phone"></i>
                  <span className="profile-nav__links-desktop">Messages</span>
                </li>

                <li
                  className={
                    this.state.display === "connections"
                      ? "profile-nav__links-text-active"
                      : "profile-nav__links-text"
                  }
                  onClick={() => this.setState({ display: "connections" })}
                >
                  <i className="fas fa-users profile-nav__links-phone"></i>
                  <span className="profile-nav__links-desktop">
                    Connections
                  </span>
                </li>
              </div>
            </ul>
          </div>
          <div className="profile-content">{this.displayStuff()}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.auth) {
    return { user: state.auth.data, avatar: state.updateAvatar };
  } else return { avatar: state.updateAvatar };
};

export default connect(mapStateToProps, { checkLogin, updateAvatar })(Profile);
