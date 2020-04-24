import React, { Component } from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";

//redux imports
import { connect } from "react-redux";
import { fetchTradeIdeas, selectTradeIdea, deleteIdea } from "../../actions";

class ShowIdeas extends Component {
  state = {};

  async componentDidMount() {
    await this.props.fetchTradeIdeas();
  }

  deleteCard = async id => {
    try {
      await this.props.deleteIdea({ cardId: id });
      await this.props.fetchTradeIdeas();
    } catch (err) {
      console.log("--=-=-=-=-=-=-=", err);
    }
  };

  formatTime = time => {
    return String(new Date(time)).substring(0, 24);
  };

  showIdeas = () => {
    if (this.props.actualTrades) {
      return this.props.actualTrades.data.map((eachTrade, index) => {
        return (
          <div key={index} className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.props.selectTradeIdea({ eachTrade });
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              className="trade-ideas-card-link"
              onClick={async () => {
                await this.props.selectTradeIdea({ eachTrade });
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

  showOtherIdeas = () => {
    if (this.props.otherProfile.tradeIdeas) {
      return this.props.otherProfile.tradeIdeas.map(eachTrade => {
        return (
          <div className="trade-ideas-card">
            <a
              href="#popup"
              onClick={async () => {
                await this.props.selectTradeIdea({ eachTrade });
              }}
              className="trade-ideas-card-more"
            >
              click for more info
            </a>
            <a
              href="#popup"
              className="trade-ideas-card-link"
              onClick={async () => {
                await this.props.selectTradeIdea({ eachTrade });
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
                                {this.props.selectedTradeIdea.eachTrade.trade.lot}
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

  editIdeas = () => {
    this.setState({ edit: true});
  };

  // handleFileUpload = async e => {
  //   console.log("The file to be uploaded is: ", e.target.files[0]);

  //   const uploadData = new FormData();
  //   await uploadData.append("imageUrl", e.target.files[0]);

  //   try {
  //     const result = await actions.handleIdeaUpdate(uploadData);
  //     console.log("result: ", result);
  //     console.log("state: ", this.props.editselectedTradeIdea.EachTrade);
  //     this.props.editselectedTradeIdea.EachTrade.imageUrl = result.secure_url;
  //     this.props.editselectedTradeIdea.EachTrade.tradeID = this.props.selectedTradeIdea.eachTrade._id;
  //     console.log("after: ", this.props.editselectedTradeIdea.EachTrade);
  //     this.setState({editselectedTradeIdea.EachTrade: this.props.editselectedTradeIdea.EachTrade})
  //     console.log("test: ", this.props.editselectedTradeIdea.EachTrade);
  //   } catch (err) {
  //     console.log("*****", err.message);
  //   }
  // };

  // handleChange = e => {
  //   let editCopy = this.props.editselectedTradeIdea.EachTrade;
  //   editCopy["tradeID"] = this.props.selectedTradeIdea.eachTrade._id;
  //   editCopy[e.target.name] = e.target.value;
  //   console.log(editCopy);
  //   this.setState({ editselectedTradeIdea.EachTrade: editCopy });
  //   console.log("test2: ", this.props.editselectedTradeIdea.EachTrade);
  // };

  // saveEdit = async e => {
  //   this.setState({ edit: false });
  //   // console.log(this.props.editselectedTradeIdea.EachTrade)
  //   e.preventDefault();
  //   //console.log(e)
  //   try {
  //     await actions.updateIdea(this.props.editselectedTradeIdea.EachTrade);
  //   } catch (err) {
  //     console.log("*****", err.message);
  //   }
  // };

  exitPopup = () => {
    this.setState({ edit: false });
  };

  render() {
    if (!this.props.otherProfile) {
      return (
        <div className="trade-ideas">
          {this.showIdeas()}
          {this.props.selectedTradeIdea &&
            this.props.selectedTradeIdea.eachTrade ? (
            <div className="popup" id="popup">
              <div className="popup__content" id="content">
                <div className="popup__left">
                  <img
                    className="popup__left--image"
                    src={this.props.selectedTradeIdea.eachTrade.trade.imageUrl}
                    alt="trade"
                  />
                </div>
                {!this.props.edit ? (
                  <div className="popup__right">
                    <a href="#main" className="popup__close">
                      &times;
                    </a>
                    <button onClick={this.editIdeas} className="popup__edit">
                      EDIT IDEA
                    </button>
                    <a
                      href="#main"
                      onClick={() => this.deleteCard(this.props.selectedTradeIdea.eachTrade._id)}
                      className="popup__delete"
                    >
                      DELETE IDEA
                    </a>

                    <h2 className="heading-secondary u-margin-bottom-small">
                      {this.props.selectedTradeIdea.eachTrade.trade.currency}{" "}
                      {this.props.selectedTradeIdea.eachTrade.trade.kind}
                    </h2>

                    <h2 className="heading-secondary u-margin-bottom-small">
                      Entry: {this.props.selectedTradeIdea.eachTrade.trade.entry}
                    </h2>
                    <h2 className="heading-secondary u-margin-bottom-small">
                      Stoploss: {this.props.selectedTradeIdea.eachTrade.trade.stoploss}
                    </h2>
                    <h2 className="heading-secondary u-margin-bottom-small">
                      Takeprofit: {this.props.selectedTradeIdea.eachTrade.trade.takeprofit}
                    </h2>

                    <h2 className="heading-secondary u-margin-bottom-small">
                      {this.props.selectedTradeIdea.eachTrade.trade.description ? (
                        <p className="popup__text">
                          {this.props.selectedTradeIdea.eachTrade.trade.description}
                        </p>
                      ) : null}
                    </h2>

                    <div className="popup_right-sharing-icons">
                      <FacebookShareButton
                        url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                        title={`MY TRADE IDEA:\n${
                          this.props.selectedTradeIdea.eachTrade.trade.currency
                        } ${this.props.selectedTradeIdea.eachTrade.trade.kind}\nEntry: ${
                          this.props.selectedTradeIdea.eachTrade.trade.entry
                        }\nStoploss: ${
                          this.props.selectedTradeIdea.eachTrade.trade.stoploss
                        }\nTakeprofit: ${
                          this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                        }\n${
                          this.props.selectedTradeIdea.eachTrade.trade.description
                            ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                            : ""
                        }`}
                        className="popup_right-sharing-icons-button"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                        title={`MY TRADE IDEA:\n${
                          this.props.selectedTradeIdea.eachTrade.trade.currency
                        } ${this.props.selectedTradeIdea.eachTrade.trade.kind}\nEntry: ${
                          this.props.selectedTradeIdea.eachTrade.trade.entry
                        }\nStoploss: ${
                          this.props.selectedTradeIdea.eachTrade.trade.stoploss
                        }\nTakeprofit: ${
                          this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                        }\n${
                          this.props.selectedTradeIdea.eachTrade.trade.description
                            ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                            : ""
                        }`}
                        className="popup_right-sharing-icons-button"
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <TelegramShareButton
                        url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                        title={`MY TRADE IDEA:\n${
                          this.props.selectedTradeIdea.eachTrade.trade.currency
                        } ${this.props.selectedTradeIdea.eachTrade.trade.kind}\nEntry: ${
                          this.props.selectedTradeIdea.eachTrade.trade.entry
                        }\nStoploss: ${
                          this.props.selectedTradeIdea.eachTrade.trade.stoploss
                        }\nTakeprofit: ${
                          this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                        }\n${
                          this.props.selectedTradeIdea.eachTrade.trade.description
                            ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                            : ""
                        }`}
                        className="popup_right-sharing-icons-button"
                      >
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                      <WhatsappShareButton
                        url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                        title={`MY TRADE IDEA:\n${
                          this.props.selectedTradeIdea.eachTrade.trade.currency
                        } ${this.props.selectedTradeIdea.eachTrade.trade.kind}\nEntry: ${
                          this.props.selectedTradeIdea.eachTrade.trade.entry
                        }\nStoploss: ${
                          this.props.selectedTradeIdea.eachTrade.trade.stoploss
                        }\nTakeprofit: ${
                          this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                        }\n${
                          this.props.selectedTradeIdea.eachTrade.trade.description
                            ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                            : ""
                        }`}
                        className="popup_right-sharing-icons-button"
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                    </div>
                  </div>
                ) : (
                  //THIS PART IS FOR THE EDITING OF IDEAS

                  <div className="popup__right">
                    <a
                      href="#main"
                      className="popup__close"
                      onClick={this.exitPopup}
                    >
                      &times;
                    </a>

                    <form className="popup-form" onSubmit={this.handleSubmit}>
                      <div>
                        <button
                          type="submit"
                          onClick={this.saveEdit}
                          className="popup__save"
                        >
                          SAVE
                        </button>
                        <div className="popup-form-group">
                          <label for="currency">Currency</label>
                          <select
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.currency}
                            className="popup-form-input"
                            required
                            onChange={this.handleChange}
                            name="currency"
                          >
                            <option></option>
                            <option>AUD/CAD</option>
                            <option>AUD/CHF</option>
                            <option>AUD/JPY</option>
                            <option>AUD/NZD</option>
                            <option>AUD/USD</option>
                            <option>CAD/CHF</option>
                            <option>CAD/JPY</option>
                            <option>CHF/JPY</option>
                            <option>EUR/AUD</option>
                            <option>EUR/CAD</option>
                            <option>EUR/CHF</option>
                            <option>EUR/GBP</option>
                            <option>EUR/JPY</option>
                            <option>EUR/NZD</option>
                            <option>EUR/USD</option>
                            <option>GBP/AUD</option>
                            <option>GBP/CAD</option>
                            <option>GBP/CHF</option>
                            <option>GBP/JPY</option>
                            <option>GBP/NZD</option>
                            <option>GBP/USD</option>
                            <option>NZD/CAD</option>
                            <option>NZD/CHF</option>
                            <option>NZD/JPY</option>
                            <option>NZD/USD</option>
                            <option>USD/CAD</option>
                            <option>USD/JPY</option>
                          </select>
                        </div>
                        <div className="popup-form-group">
                          <label for="type">Sell or Buy</label>
                          <select
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.kind}
                            className="popup-form-input"
                            onChange={this.handleChange}
                            name="kind"
                            required
                          >
                            <option value=""></option>
                            <option value="sell">Sell</option>
                            <option value="buy">Buy</option>
                          </select>
                        </div>
                        <div className="popup-form-group">
                          <label for="lot">Lot size</label>
                          <input
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.lot}
                            onChange={this.handleChange}
                            type="number"
                            className="popup-form-input"
                            name="lot"
                            step="0.01"
                            min="0"
                            max="100"
                            required
                          />
                        </div>

                        <div className="popup-form-group">
                          <label for="lot">Description</label>
                          <textarea
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.description}
                            onChange={this.handleChange}
                            type="text"
                            className="popup-form-input"
                            name="description"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="popup-form-group">
                          <label for="entry">Entry price</label>
                          <input
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.entry}
                            onChange={this.handleChange}
                            type="number"
                            className="popup-form-input"
                            name="entry"
                            step="0.0001"
                            min="0"
                            max="1000"
                            required
                          />
                        </div>
                        <div className="popup-form-group">
                          <label for="close">Stop Loss</label>
                          <input
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.stoploss}
                            onChange={this.handleChange}
                            type="number"
                            className="popup-form-input"
                            name="stoploss"
                            step="0.0001"
                            min="0"
                            max="1000"
                            required
                          />
                        </div>
                        <div className="popup-form-group">
                          <label for="close">Take Profit</label>
                          <input
                            placeholder={this.props.selectedTradeIdea.eachTrade.trade.takeprofit}
                            onChange={this.handleChange}
                            type="number"
                            className="popup-form-input"
                            name="takeprofit"
                            step="0.0001"
                            min="0"
                            max="1000"
                            required
                          />
                        </div>
                        <div className="popup-form-group">
                          <label for="screenshot">Screenshot</label>
                          <input
                            onChange={e => this.handleFileUpload(e)}
                            type="file"
                            className="popup-form-input-file"
                            name="screenshot"
                            id="screenshot"
                            required
                          />
                          <label
                            tabindex="0"
                            for="screenshot"
                            class="popup-form-input-file-label"
                          >
                            Select a file...
                          </label>
                          {this.props.imageUrl ? (
                            <p>
                              {this.props.imageUrl.slice(
                                this.props.imageUrl.lastIndexOf("/") + 1,
                                -4
                              )}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="trade-ideas">
          {this.showOtherIdeas()}
          {/* {this.exitPopup()} */}

          {this.props.selectedTradeIdea &&
            this.props.selectedTradeIdea.eachTrade ? (
            <div className="popup" id="popup">
              <div className="popup__content" id="content">
                <div className="popup__left">
                  <img src={this.props.selectedTradeIdea.eachTrade.imageUrl} alt="trade" />
                </div>
                <div className="popup__right">
                  <a href="#main" className="popup__close">
                    &times;
                  </a>
                  {/* <button onClick={this.editIdeas} className="popup__edit">EDIT IDEA</button>
                                <a href="#main" onClick={() => this.deleteCard(this.props.selectedTradeIdea.eachTrade._id)} className="popup__delete">DELETE IDEA</a>
                                 */}
                  <h2 className="heading-secondary u-margin-bottom-small">
                    {this.props.selectedTradeIdea.eachTrade.trade.currency}{" "}
                    {this.props.selectedTradeIdea.eachTrade.trade.kind}
                  </h2>

                  <h2 className="heading-secondary u-margin-bottom-small">
                    Entry: {this.props.selectedTradeIdea.eachTrade.trade.entry}
                  </h2>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    Stoploss: {this.props.selectedTradeIdea.eachTrade.trade.stoploss}
                  </h2>
                  <h2 className="heading-secondary u-margin-bottom-small">
                    Takeprofit: {this.props.selectedTradeIdea.eachTrade.trade.takeprofit}
                  </h2>

                  <h2 class="heading-secondary u-margin-bottom-small">
                    {this.props.selectedTradeIdea.eachTrade.trade.description ? (
                      <p class="popup__text">
                        Description: {this.props.selectedTradeIdea.eachTrade.trade.description}
                      </p>
                    ) : (
                      <p class="popup__text">No description provided</p>
                    )}
                  </h2>

                  <div className="popup_right-sharing-icons">
                    <FacebookShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                      title={`${
                        this.props.selectedTradeIdea.eachTrade.trade.trader
                      }'s TRADE IDEA:\n${this.props.selectedTradeIdea.eachTrade.trade.currency} ${
                        this.props.selectedTradeIdea.eachTrade.trade.kind
                      }\nEntry: ${
                        this.props.selectedTradeIdea.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.props.selectedTradeIdea.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                      }\n${
                        this.props.selectedTradeIdea.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                      title={`${
                        this.props.selectedTradeIdea.eachTrade.trade.trader
                      }'s TRADE IDEA:\n${this.props.selectedTradeIdea.eachTrade.trade.currency} ${
                        this.props.selectedTradeIdea.eachTrade.trade.kind
                      }\nEntry: ${
                        this.props.selectedTradeIdea.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.props.selectedTradeIdea.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                      }\n${
                        this.props.selectedTradeIdea.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <TelegramShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                      title={`${
                        this.props.selectedTradeIdea.eachTrade.trade.trader
                      }'s TRADE IDEA:\n${this.props.selectedTradeIdea.eachTrade.trade.currency} ${
                        this.props.selectedTradeIdea.eachTrade.trade.kind
                      }\nEntry: ${
                        this.props.selectedTradeIdea.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.props.selectedTradeIdea.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                      }\n${
                        this.props.selectedTradeIdea.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <WhatsappShareButton
                      url={`https://www.tracktrade.co/profile/${this.props.selectedTradeIdea.eachTrade.trade.trader}`}
                      title={`${
                        this.props.selectedTradeIdea.eachTrade.trade.trader
                      }'s TRADE IDEA:\n${this.props.selectedTradeIdea.eachTrade.trade.currency} ${
                        this.props.selectedTradeIdea.eachTrade.trade.kind
                      }\nEntry: ${
                        this.props.selectedTradeIdea.eachTrade.trade.entry
                      }\nStoploss: ${
                        this.props.selectedTradeIdea.eachTrade.trade.stoploss
                      }\nTakeprofit: ${
                        this.props.selectedTradeIdea.eachTrade.trade.takeprofit
                      }\n${
                        this.props.selectedTradeIdea.eachTrade.trade.description
                          ? `Description: ${this.props.selectedTradeIdea.eachTrade.trade.description}\n`
                          : ""
                      }`}
                      className="popup_right-sharing-icons-button"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                </div>
                }
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}


const mapStateToProps = state => {
  return {actualTrades: state.ideas, selectedTradeIdea: state.selectedTradeIdea, otherProfile: state.otherProfile}
}

export default connect(mapStateToProps, {fetchTradeIdeas, selectTradeIdea, deleteIdea})(ShowIdeas)