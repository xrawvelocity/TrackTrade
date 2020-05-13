import React from "react";
import Header from "../partials/Header";

import { Form, Field } from "react-final-form";

// redux imports
import { connect } from "react-redux";
import { postTrade, tradeImageUpload } from "../../actions";

const PostTrade = (props) => {
  const handleTheSubmit = async (values) => {
    let pips = 0;

    //sell not jpy
    if (values.kind === "sell" && !values.currency.includes("JPY")) {
      pips = Math.ceil(values.entry * 10000 - values.close * 10000);
    }
    //sell jpy
    else if (values.kind === "sell" && values.currency.includes("JPY")) {
      pips = Math.ceil(values.entry * 100 - values.close * 100);
    }
    //buy not jpy
    else if (values.kind === "buy" && !values.currency.includes("JPY")) {
      pips = Math.ceil(values.close * 10000 - values.entry * 10000);
    }
    //buy jpy
    else if (values.kind === "buy" && values.currency.includes("JPY")) {
      pips = Math.ceil(values.close * 100 - values.entry * 100);
    }

    await props.postTrade({
      ...values,
      imageUrl: props.imageUrl.secure_url,
      money: pips * values.lot * 10,
    });
    props.history.push("/profile");
  };

  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    await uploadData.append("imageUrl", e.target.files[0]);

    try {
      await props.tradeImageUpload(uploadData);
      console.log("props", props);
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  return (
    <div className="trade-idea">
      <Header {...props} loggedIn={true} />
      <div className="trade-idea-container">
        <Form
          validate={(values) => {
            console.log(values);
            const errors = {};
            if (!values.currency) {
              errors.currency = "*";
            }
            if (!values.kind) {
              errors.kind = "*";
            }
            if (!values.lot) {
              errors.lot = "*";
            }
            if (!values.entry) {
              errors.entry = "*";
            }
            if (!values.close) {
              errors.close = "*";
            }
            console.log(errors);
            return errors;
          }}
          onSubmit={handleTheSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            valid,
            errors,
          }) => (
            <form className="trade-idea-container-form" onSubmit={handleSubmit}>
              <div className="trade-idea-top">
                <div className="trade-idea-left">
                  <Field name="currency">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="currency">Currency</label>
                            {errors.currency && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.currency}
                              </p>
                            )}
                          </div>
                          <select
                            {...input}
                            className="trade-idea-container-form-input"
                            required
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
                      );
                    }}
                  </Field>
                  <Field name="kind">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="kind">Sell or Buy</label>
                            {errors.kind && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.kind}
                              </p>
                            )}
                          </div>
                          <select
                            {...input}
                            className="trade-idea-container-form-input"
                            required
                          >
                            <option value=""></option>
                            <option value="sell">Sell</option>
                            <option value="buy">Buy</option>
                          </select>
                        </div>
                      );
                    }}
                  </Field>

                  <Field name="lot">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="lot">Lot size</label>
                            {errors.lot && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.lot}
                              </p>
                            )}
                          </div>
                          <input
                            {...input}
                            type="number"
                            className="trade-idea-container-form-input"
                            step="0.001"
                            min="0.001"
                            max="100"
                            required
                          />
                        </div>
                      );
                    }}
                  </Field>
                </div>
                <div className="trade-idea-right">
                  <Field name="entry">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="entry">Entry price</label>
                            {errors.entry && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.entry}
                              </p>
                            )}
                          </div>
                          <input
                            {...input}
                            type="number"
                            className="trade-idea-container-form-input"
                            step="0.0001"
                            min="0"
                            max="1000"
                            required
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <Field name="close">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="close">Close price</label>
                            {errors.close && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.close}
                              </p>
                            )}
                          </div>
                          <input
                            {...input}
                            type="number"
                            className="trade-idea-container-form-input"
                            step="0.0001"
                            min="0"
                            max="1000"
                            required
                          />
                        </div>
                      );
                    }}
                  </Field>
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="risk">Risk %</label>
                    <Field
                      name="risk"
                      type="number"
                      className="trade-idea-container-form-input"
                      component="input"
                    />
                  </div>
                </div>
              </div>
              <Field name="description">
                {({ input, meta }) => {
                  return (
                    <div className="trade-idea-container-form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        {...input}
                        type="text"
                        className="trade-idea-container-form-description"
                      />
                    </div>
                  );
                }}
              </Field>
              <div className="trade-idea-container-form-group">
                <div style={{ display: "flex" }}>
                  <label htmlFor="screenshot">Screenshot</label>
                  {!props.imageUrl && (
                    <p className="trade-idea-container-form-input__error">*</p>
                  )}
                </div>
                <input
                  onChange={(e) => handleFileUpload(e)}
                  type="file"
                  className="trade-idea-container-form-input-file"
                  name="screenshot"
                  id="screenshot"
                  required
                />
                <label
                  tabindex="0"
                  htmlFor="screenshot"
                  class="trade-idea-container-form-input-file-label"
                >
                  Select a file...
                </label>
                {props.imageUrl ? (
                  <p>
                    {props.imageUrl.secure_url.slice(
                      props.imageUrl.secure_url.lastIndexOf("/") + 1,
                      -4
                    )}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={!valid}
                className="trade-idea-container-form-btn"
              >
                Post Trade
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { postTrade: state.postTrade, imageUrl: state.tradeImage };
};

export default connect(mapStateToProps, { postTrade, tradeImageUpload })(
  PostTrade
);
