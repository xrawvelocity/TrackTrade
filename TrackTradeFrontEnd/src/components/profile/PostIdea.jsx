import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";

import { Form, Field } from "react-final-form";

// redux imports
import { connect } from "react-redux";
import { postIdea, ideaImageUpload } from "../../actions";

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

const PostIdea = (props) => {
  const [tradeIdea, setTradeIdea] = useState(null);

  useDidUpdate(async () => {
    await props.postIdea(tradeIdea);
    props.history.push("/profile");
  }, [tradeIdea]);

  const handleFileUpload = async (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    await uploadData.append("imageUrl", e.target.files[0]);

    await props.ideaImageUpload(uploadData);
  };

  const handleTheSubmit = async (values) => {
    console.log("values", values);
    await setTradeIdea({ ...values, imageUrl: props.imageUrl.secure_url });
    console.log("first attempt", tradeIdea);
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
            if (!values.stoploss) {
              errors.stoploss = "*";
            }
            if (!values.takeprofit) {
              errors.takeprofit = "*";
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
                  <Field name="stoploss">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="stoploss">Stop Loss</label>
                            {errors.stoploss && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.stoploss}
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
                  <Field name="takeprofit">
                    {({ input, meta }) => {
                      return (
                        <div className="trade-idea-container-form-group">
                          <div style={{ display: "flex" }}>
                            <label htmlFor="takeprofit">Take Profit</label>
                            {errors.takeprofit && (
                              <p className="trade-idea-container-form-input__error">
                                {errors.takeprofit}
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
                Post Idea
              </button>
            </form>
          )}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { postIdea: state.postIdea, imageUrl: state.ideaImage };
};

export default connect(mapStateToProps, { postIdea, ideaImageUpload })(
  PostIdea
);
