import React, { useState, useEffect, useRef } from "react";

// redux imports
import { connect } from "react-redux";
import { fetchAllTraders } from "../../actions";
import { fetchAllMessages, sendMessage } from "../../actions/messages.js";
import { checkLogin } from "../../actions/auth";

const Messages = (props) => {
  const [selectedProfile, selectProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!props.allMessages) {
      fetchData();
      console.log("++++++");
    } else {
      console.log("-------");
      let actualMessages = props.allMessages.data.filter((eachMessage) => {
        return (
          eachMessage.sender === props.user._id ||
          eachMessage.receiver === props.user._id
        );
      });
      console.log("test", actualMessages);
      setMessages(actualMessages);
    }
  }, [props.allMessages]);

  const ref = useRef(message);

  const fetchData = async () => {
    await props.fetchAllTraders();
    await props.fetchAllMessages();

    await props.checkLogin();
    console.log("props----", props);

    console.log("props", props);
  };

  const formatTime = (time) => String(new Date(time)).substring(0, 24);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await props.sendMessage({
        message: message,
        otherProfile: selectedProfile._id,
      });
      await props.fetchAllMessages();
      await props.checkLogin();
      console.log("props", props);
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  const selectTheProfile = () => {
    if (props.allTraders && props.user) {
      let copyTraders = [...props.allTraders.data];
      let filteredTraders = copyTraders.filter((eachTrader) => {
        return props.user.connections.includes(eachTrader._id);
        //loop through props.user to get connections and
        //only return those that match you know
      });
      return filteredTraders.map((eachOne, index) => {
        if (selectedProfile === eachOne) {
          return (
            <a
              key={index}
              className="connections-container-each-active"
              href="#chatbox"
              onClick={() => {
                selectProfile(eachOne);
                console.log(selectedProfile);
              }}
            >
              {imageMessagesLoad(eachOne)}
              {eachOne.username}
            </a>
          );
        } else {
          return (
            <a
              key={index}
              className="connections-container-each"
              href="#chatbox"
              onClick={() => {
                selectProfile(eachOne);
                console.log(selectedProfile);
              }}
            >
              {imageMessagesLoad(eachOne)}
              <span>{eachOne.username}</span>
            </a>
          );
        }
      });
    }
  };

  const imageMessagesLoad = (profile) => {
    if (profile) {
      return profile.avatar ? (
        <img
          className="connections-container-each-avatar"
          src={profile.avatar}
          alt="Avatar"
        />
      ) : (
        <div className="connections-container-each-avatar-default"></div>
      );
    }
  };

  const imageLoad = () => {
    if (selectedProfile) {
      return selectedProfile.avatar ? (
        <img
          className="profile-nav__user-avatar__image"
          src={selectedProfile.avatar}
          alt="Avatar"
        />
      ) : (
        <div className="profile-nav__user-avatar__image-default"></div>
      );
    }
  };

  const showMessages = () => {
    if (selectedProfile && props.allMessages) {
      console.log(props.allMessages);
      return (
        <div className="chatbox" id="chatbox">
          <div className="chatbox__content" id="content">
            <div className="chatbox__top">
              <div className="chatbox__top-avatar profile-nav__user-avatar">
                {imageLoad()}
                <div className="profile-nav__user-avatar__image-default"></div>
              </div>
              <h1 className="profile-nav__user-username">
                {selectedProfile.username}
              </h1>
            </div>
            <div className="chatbox__middle">
              <div className="chatbox__middle-content">
                <a
                  href="#main"
                  onClick={() => selectProfile(null)}
                  className="chatbox__close"
                >
                  &times;
                </a>

                {messages.map((eachMessage) => {
                  if (
                    eachMessage.sender === props.user._id &&
                    eachMessage.receiver === selectedProfile._id
                  ) {
                    return (
                      <div className="chatbox__middle-bubble chatbox__middle-bubble-sender">
                        {eachMessage.content}
                      </div>
                    );
                  } else if (
                    eachMessage.receiver === props.user._id &&
                    eachMessage.sender === selectedProfile._id
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
                onSubmit={(e) => sendMessage(e)}
                className="chatbox__bottom-form"
              >
                <textarea
                  onChange={(e) => handleChange(e)}
                  ref={ref}
                  type="text"
                  name="message"
                  value={message}
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

  return (
    <div className="connections">
      <div className="connections-container">{selectTheProfile()}</div>
      <div className="connections-card">
        <div className="trade-ideas">{showMessages()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.auth) {
    return {
      allTraders: state.allTraders,
      allMessages: state.allMessages,
      user: state.auth.data,
      sendMessage: state.sendMessage,
    };
  } else
    return {
      allTraders: state.allTraders,
      allMessages: state.allMessages,
      sendMessage: state.sendMessage,
    };
};

export default connect(mapStateToProps, {
  fetchAllTraders,
  fetchAllMessages,
  checkLogin,
  sendMessage,
})(Messages);
