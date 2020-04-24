import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";

import { Form, Field } from "react-final-form";

// redux imports
import { connect } from "react-redux";
import { postTrade, tradeImageUpload } from "../../actions";

function useDidUpdate(callback, deps) {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
}

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
            const errors = {};
            if (values.lot < 0) {
              errors.lot = "This cant be less than zero";
            } else if (!values.lot) {
              errors.lot = "This fields is required";
            }
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
            errors
          }) => (
            <form className="trade-idea-container-form" onSubmit={handleSubmit}>
              <div className="trade-idea-top">
                <div className="trade-idea-left">
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="currency">Currency</label>
                    <Field
                      className="trade-idea-container-form-input"
                      required
                      name="currency"
                      component="select"
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
                    </Field>
                  </div>
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="kind">Sell or Buy</label>
                    <Field
                      name="kind"
                      className="trade-idea-container-form-input"
                      component="select"
                    >
                      <option value=""></option>
                      <option value="sell">Sell</option>
                      <option value="buy">Buy</option>
                    </Field>
                  </div>
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="lot">Lot size</label>
                    <Field
                      name="lot"
                      type="number"
                      className="trade-idea-container-form-input"
                      component="input"
                    />
                    <p>{errors.lot}</p>
                  </div>
                </div>
                <div className="trade-idea-right">
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="entry">Entry price</label>
                    <Field
                      name="entry"
                      type="number"
                      className="trade-idea-container-form-input"
                      component="input"
                    />
                    {/* <input
                        onChange={handleChange}
                        type="number"
                        className="trade-idea-container-form-input"
                        name="entry"
                        step="0.0001"
                        min="0"
                        max="1000"
                        required
                      /> */}
                  </div>
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="close">Close price</label>
                    <Field
                      name="close"
                      type="number"
                      className="trade-idea-container-form-input"
                      component="input"
                    />
                    {/* <input
                        onChange={handleChange}
                        type="number"
                        className="trade-idea-container-form-input"
                        name="close"
                        step="0.0001"
                        min="0"
                        max="1000"
                        required
                      /> */}
                  </div>
                  <div className="trade-idea-container-form-group">
                    <label htmlFor="risk">Risk %</label>
                    <Field
                      name="risk"
                      type="number"
                      className="trade-idea-container-form-input"
                      component="input"
                    />
                    {/* <input
                        onChange={handleChange}
                        type="number"
                        className="trade-idea-container-form-input"
                        name="risk"
                        step="0.01"
                        min="0"
                        max="100"
                        required
                      /> */}
                  </div>
                </div>
              </div>
              <div className="trade-idea-container-form-group">
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  className="trade-idea-container-form-description"
                  component="textarea"
                />
                {/* <textarea
                    onChange={handleChange}
                    type="text"
                    className="trade-idea-container-form-description"
                    name="description"
                  /> */}
              </div>
              <div className="trade-idea-container-form-group">
                <label htmlFor="screenshot">Screenshot</label>
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
  return { postTrade: state.postTrade, imageUrl: state.tradeImageUpload };
};

export default connect(mapStateToProps, { postTrade, tradeImageUpload })(
  PostTrade
);
