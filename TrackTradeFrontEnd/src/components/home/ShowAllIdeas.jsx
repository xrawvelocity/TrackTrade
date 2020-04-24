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
import { connect } from 'react-redux';
import { fetchAllTradeIdeas } from '../../actions';

class ShowAllIdeas extends Component {
  state = {};

  async componentDidMount() {
    await this.props.fetchAllTradeIdeas();
    this.setState({ tradeIdeas: this.props.actualTrades.data.reverse() });
    console.log("-----", this.props)
  }

  formatTime = (time) => {
    return String(new Date(time)).substring(0, 24);
  };

  searchTradeIdeas = (e) => {
    let tradersList = [...this.state.allTradeIdeas];
    let filteredTradeIdeas = tradersList.filter((eachTradeIdea) => {
      return eachTradeIdea.trade.currency
        .split("/")
        .join("")
        .toLowerCase()
        .includes(e.target.value.split("/").join("").toLowerCase());
    });
    console.log(filteredTradeIdeas);
    if (filteredTradeIdeas) {
      this.setState({
        tradeIdeas: filteredTradeIdeas,
      });
    }
  };

  sortTradeIdeas = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      this.setState({ tradeIdeas: this.props.actualTrades .data});
    } else if (e.target.value === "sell") {
      let tradeIdeasList = [...this.props.actualTrades.data];
      let filteredTradeIdeas = tradeIdeasList.filter((eachTradeIdea) => {
        return eachTradeIdea.trade.kind === "sell";
      });
      this.setState({ tradeIdeas: filteredTradeIdeas });
    } else if (e.target.value === "buy") {
      let tradeIdeasList = [...this.props.actualTrades.data];
      let filteredTradeIdeas = tradeIdeasList.filter((eachTradeIdea) => {
        return eachTradeIdea.trade.kind === "buy";
      });
      this.setState({ tradeIdeas: filteredTradeIdeas });
    } else if (e.target.value === "created-newest") {
      let tradeIdeasList = [...this.props.actualTrades.data];
      tradeIdeasList.sort((b, a) => {
        // console.log(a.created_at, "-----", b.created_at)
        return a.created_at.localeCompare(b.created_at);
      });
      this.setState({ tradeIdeas: tradeIdeasList });
    } else if (e.target.value === "created-oldest") {
      let tradeIdeasList = [...this.props.actualTrades.data];
      tradeIdeasList.sort((a, b) => {
        // console.log(a.created_at, "-----", b.created_at)
        return a.created_at.localeCompare(b.created_at);
      });
      this.setState({ tradeIdeas: tradeIdeasList });
    }
  };

  showIdeas = () => {
    if (this.state.tradeIdeas) {
      return this.state.tradeIdeas.map((eachTrade) => {
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
              className="trade-ideas-card-link"
              onClick={async () => {
                await this.setState({ eachTrade });
                console.log(this.state);
              }}
            >
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
              {/* <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Stoploss:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.stoploss}
                            </div>
                        </div>
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Takeprofit:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {eachTrade.trade.takeprofit}
                            </div>
                        </div> */}
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
              {eachTrade.updatedAt === eachTrade.created_at ? null : (
                <div className="trade-ideas-card__item-date">
                  <div className="trade-ideas-card__item-date-title">
                    Updated at:
                  </div>
                  <div className="trade-ideas-card__item-date-content">
                    {this.formatTime(eachTrade.updatedAt)}
                  </div>
                </div>
              )}
            </a>
          </div>
        );
      });
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
              onChange={this.searchTradeIdeas}
              className="home-content--search"
              type="text"
              placeholder="Search for trade ideas by their currency"
            />
            <label className="home-content--label" htmlFor="sort">
              Sort By:
            </label>
            <select
              name="sort"
              className="home-content--select"
              onChange={this.sortTradeIdeas}
            >
              <option value="">-</option>
              <option value="sell">Sells</option>
              <option value="buy">Buys</option>
              <option value="created-newest">Created: newest</option>
              <option value="created-oldest">Created: oldest</option>
            </select>
          </div>
        </div>
        <div className="trade-ideas">
          {this.showIdeas()}
          {/* {this.exitPopup()} */}

          {this.state.eachTrade ? (
            <div class="popup" id="popup">
              <div class="popup__content" id="content">
                <div class="popup__right">
                  <a href="#main" class="popup__close">
                    &times;
                  </a>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.currency}{" "}
                    {this.state.eachTrade.trade.kind}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    Entry: {this.state.eachTrade.trade.entry}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Stoploss: {this.state.eachTrade.trade.stoploss}
                  </h2>
                  <h2 class="heading-secondary u-margin-bottom-small">
                    Takeprofit: {this.state.eachTrade.trade.takeprofit}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.state.eachTrade.trade.description ? (
                      <p class="popup__text">
                        {this.state.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p class="popup__text">No description provided</p>
                    )}
                  </h2>
                  <p class="popup__text">
                    Created by:
                    <Link to={`/profile/${this.state.eachTrade.trade.trader}`}>
                      {this.state.eachTrade.trade.trader}
                    </Link>
                  </p>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.state.eachTrade.trade.trader}`}
                      title={`${
                        this.state.eachTrade.trade.trader
                      }'s TRADE IDEA:\n${this.state.eachTrade.trade.currency} ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.state.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.state.eachTrade.trade.takeprofit
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
                      }'s TRADE IDEA:\n${this.state.eachTrade.trade.currency} ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.state.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.state.eachTrade.trade.takeprofit
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
                      }'s TRADE IDEA:\n${this.state.eachTrade.trade.currency} ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.state.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.state.eachTrade.trade.takeprofit
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
                      }'s TRADE IDEA:\n${this.state.eachTrade.trade.currency} ${
                        this.state.eachTrade.trade.kind
                      }\nEntry: ${
                        this.state.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.state.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.state.eachTrade.trade.takeprofit
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    return { actualTrades: state.ideas }
}

export default connect(mapStateToProps, {fetchAllTradeIdeas})(ShowAllIdeas)