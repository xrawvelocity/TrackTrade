import React, { Component } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

//redux imports
import { connect } from "react-redux";
import { fetchTrades } from "../../actions";

class ShowTrades extends Component {
  state = {};

  async componentDidMount() {
    await this.props.fetchTrades();
  }

  formatTime = (time) => {
    return String(new Date(time)).substring(0, 24);
  };

  showIdeas = () => {
    if (this.props.actualTrades.data) {
      return this.props.actualTrades.data.map((eachTrade, index) => {
        return (
          <div key={index} className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
              }}
              className="trade-ideas-card-link"
            >
              {eachTrade.trade.money > 0 ? (
                <div className="trade-ideas-card-win">
                  ${eachTrade.trade.money.toFixed(2)}
                </div>
              ) : (
                <div className="trade-ideas-card-loss">
                  -${Math.abs(eachTrade.trade.money).toFixed(2)}
                </div>
              )}

              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">
                  {eachTrade.trade.currency} {eachTrade.trade.kind}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Lot Size:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.lot.toFixed(2)}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Entry:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.entry}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Close:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.close}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">By:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.trader}
                </div>
              </div>
              <div className="trade-ideas-card__item-date">
                <div className="trade-ideas-card__item-date-title">
                  Created at:
                </div>
                <div className="trade-ideas-card__item-date-content">
                  {this.formatTime(eachTrade.created_at)}
                </div>
              </div>
            </a>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  showOtherIdeas = () => {
    if (this.props.otherProfile) {
      return this.props.otherProfile.trades.map((eachTrade, index) => {
        return (
          <div key={index} className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              onClick={async () => {
                await this.setState({ eachTrade });
              }}
              className="trade-ideas-card-link"
            >
              {eachTrade.trade.money > 0 ? (
                <div className="trade-ideas-card-win-all">WIN</div>
              ) : (
                <div className="trade-ideas-card-loss-all">LOSS</div>
              )}

              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">
                  {eachTrade.trade.currency} {eachTrade.trade.kind}
                </div>
              </div>

              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Entry:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.entry}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">Close:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.close}
                </div>
              </div>
              <div className="trade-ideas-card__item">
                <div className="trade-ideas-card__item-title">By:</div>
                <div className="trade-ideas-card__item-content">
                  {eachTrade.trade.trader}
                </div>
              </div>
              <div className="trade-ideas-card__item-date">
                <div className="trade-ideas-card__item-date-title">
                  Created at:
                </div>
                <div className="trade-ideas-card__item-date-content">
                  {this.formatTime(eachTrade.created_at)}
                </div>
              </div>
            </a>
          </div>
        );
      });
    } else {
      return null;
    }
  };

  render() {
    if (!this.props.otherProfile) {
      return (
        <div className="trade-ideas">
          {this.showIdeas()}
          {this.state.eachTrade  ? (
            <div className="popup" id="popup">
              <div className="popup__content" id="content">
                <div className="popup__left">
                  <img
                    className="popup__left--image"
                    src={this.state.eachTrade.trade.imageUrl}
                    alt="trade"
                  />
                </div>
                <div className="popup__right">
                  <a href="#main" className="popup__close">
                    &times;
                  </a>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.currency}{" "}
                    {this.state.eachTrade.trade.kind}
                  </h2>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    Lot size: {this.state.eachTrade.trade.lot}
                  </h2>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    Entry: {this.state.eachTrade.trade.entry}
                  </h2>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    Closed at: {this.state.eachTrade.trade.close}
                  </h2>
                  {this.state.eachTrade.trade.money > 0 ? (
                    <div className="trade-ideas-card-win-popup">
                      $
                      {this.state.eachTrade.trade.money.toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    <div className="trade-ideas-card-loss-popup">
                      -$
                      {Math.abs(
                        this.state.eachTrade.trade.money
                      ).toFixed(2)}
                    </div>
                  )}

                  <h2 className="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.description ? (
                      <p className="popup__text">
                        {this.state.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p className="popup__text"></p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`MY TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="trade-ideas">
          {this.showOtherIdeas()}
          {this.state.eachTrade  ? (
            <div className="popup" id="popup">
              <div className="popup__content" id="content">
                {/* <div className="popup__left">
                                
                            </div> */}
                <div className="popup__right">
                  <a href="#main" className="popup__close">
                    &times;
                  </a>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.currency}{" "}
                    {this.state.eachTrade.trade.kind}
                  </h2>

                  <h2 className="heading-secondary u-margin-bottom-small">
                    Entry: {this.state.eachTrade.trade.entry}
                  </h2>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    Closed at: {this.state.eachTrade.trade.close}
                  </h2>

                  <h2 className="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.description ? (
                      <p className="popup__text">
                        {this.state.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p className="popup__text">No description provided</p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${
                        this.state.eachTrade.trade.trader
                      }'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${
                        this.state.eachTrade.trade.trader
                      }'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${
                        this.state.eachTrade.trade.trader
                      }'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${
                        this.state.eachTrade.trade.trader
                      }'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${
                        this.state.eachTrade.trade.close
                      }\n${
                        this.state.eachTrade.trade.description
                          ? `Description: ${this.state.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    actualTrades: state.trades.moretrades,
    otherProfile: state.otherProfile,
  };
};

export default connect(mapStateToProps, { fetchTrades })(
  ShowTrades
);
