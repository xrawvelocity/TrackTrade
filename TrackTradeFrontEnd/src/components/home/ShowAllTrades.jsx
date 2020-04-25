import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

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

// redux imports
import { connect } from "react-redux";
import { fetchAllTrades } from "../../actions";

class ShowAllTrades extends Component {
  state = {};

  async componentDidMount() {
    await this.props.fetchAllTrades();
    this.setState({ trades: this.props.allTrades.data });
  }

  formatTime = (time) => {
    return String(new Date(time)).substring(0, 24);
  };

  searchTrades = (e) => {
    let tradersList = [...this.state.allTrades];
    let filteredTrades = tradersList.filter((eachTrade) => {
      return eachTrade.trade.currency
        .split("/")
        .join("")
        .toLowerCase()
        .includes(e.target.value.split("/").join("").toLowerCase());
    });
    console.log(filteredTrades);
    if (filteredTrades) {
      this.setState({
        trades: filteredTrades,
      });
    }
  };

  sortTrades = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({ trades: this.props.allTrades.data });
    } else if (e.target.value === "sell") {
      let tradesList = [...this.props.allTrades.data];
      let filteredTrades = tradesList.filter((eachTrade) => {
        return eachTrade.trade.kind === "sell";
      });
      this.setState({ trades: filteredTrades });
    } else if (e.target.value === "buy") {
      let tradesList = [...this.props.allTrades.data];
      let filteredTrades = tradesList.filter((eachTrade) => {
        return eachTrade.trade.kind === "buy";
      });
      this.setState({ trades: filteredTrades });
    } else if (e.target.value === "wins") {
      let tradesList = [...this.props.allTrades.data];
      let filteredTrades = tradesList.filter((eachTrade) => {
        return eachTrade.trade.money > 0;
      });
      this.setState({ trades: filteredTrades });
    } else if (e.target.value === "losses") {
      let tradesList = [...this.props.allTrades.data];
      let filteredTrades = tradesList.filter((eachTrade) => {
        return eachTrade.trade.money < 0;
      });
      this.setState({ trades: filteredTrades });
    } else if (e.target.value === "created-newest") {
      let tradesList = [...this.props.allTrades.data];
      tradesList.sort((b, a) => {
        // console.log(a.created_at, "-----", b.created_at)
        return a.created_at.localeCompare(b.created_at);
      });
      this.setState({ trades: tradesList });
    } else if (e.target.value === "created-oldest") {
      let tradesList = [...this.props.allTrades.data];
      tradesList.sort((a, b) => {
        // console.log(a.created_at, "-----", b.created_at)
        return a.created_at.localeCompare(b.created_at);
      });
      this.setState({ trades: tradesList });
    }
  };

  showTrades = () => {
    if (this.props.allTrades) {
      return this.state.trades
        ? this.state.trades.map((eachTrade) => {
            return (
              <div className="trade-ideas-card">
                <a
                  href="#popup"
                  onClick={async () => {
                    await this.setState({ eachTrade });
                    console.log(this.state);
                  }}
                  className="trade-ideas-card-more"
                >
                  click for more info
                </a>
                <a
                  href="#popup"
                  onClick={async () => {
                    await this.setState({ eachTrade });
                    console.log(this.state);
                  }}
                  className="trade-ideas-card-link"
                >
                  {/* <div onClick={() => this.deleteCard(eachTrade._id)} className="trade-ideas-card-delete">&times;</div> */}

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
                  {/* <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Lot Size:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.lot}
                            </div>
                        </div> */}
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
          })
        : null;
    } else {
      return null;
    }
  };

  render() {
    return (
      <Fragment>
        <div className="home-content-search-sort">
          <div className="home-content-section1">
            <input
              onChange={this.searchTrades}
              className="home-content--search"
              type="text"
              placeholder="Search for trades by their currency"
            />
            <label className="home-content--label" htmlFor="sort">
              Sort By:
            </label>
            <select
              name="sort"
              className="home-content--select"
              onChange={this.sortTrades}
            >
              <option value="">-</option>
              <option value="sell">Sells</option>
              <option value="buy">Buys</option>
              <option value="wins">Wins</option>
              <option value="losses">Losses</option>
              <option value="created-newest">Created: newest</option>
              <option value="created-oldest">Created: oldest</option>
            </select>
          </div>
        </div>
        <div className="trade-ideas">
          {this.showTrades()}
          {this.state.eachTrade ? (
            <div className="popup" id="popup">
              <div className="popup__content" id="content">
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
                  <p className="popup__text">
                    Created by:
                    <Link to={`/profile/${this.state.eachTrade.trade.trader}`}>
                      {this.state.eachTrade.trade.trader}
                    </Link>
                  </p>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
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
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
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
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
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
                      title={`${this.state.eachTrade.trade.trader}'s TRADE:\n${
                        this.state.eachTrade.trade.currency
                      } ${this.state.eachTrade.trade.kind}\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nClose: ${this.state.eachTrade.trade.close}\n${
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { allTrades: state.trades.trades };
};

export default connect(mapStateToProps, { fetchAllTrades })(ShowAllTrades);
