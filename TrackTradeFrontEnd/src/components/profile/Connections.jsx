import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

// redux imports
import { connect } from "react-redux";
import { fetchAllTrades, fetchAllTraders } from "../../actions";
import { checkLogin } from "../../actions/auth";

const Connections = (props) => {
  useEffect(() => {
    if (!props.allTraders) {
      fetchData();
    } else {
      console.log("hurray!");
    }
  });

  const fetchData = async () => {
    await props.fetchAllTraders();

    await props.fetchAllTrades();

    await props.checkLogin();
  };

  const formatTime = (time) => String(new Date(time)).substring(0, 24);

  const winLossRatio = (user) => {
    if (props.actualTrades) {
      let wins = 0;
      let losses = 0;

      let copyTrades = [...props.actualTrades.data];
      let userTrades = copyTrades.filter((eachTrade) => {
        return eachTrade.trade.trader === user;
      });
      // console.log(userTrades)
      userTrades.forEach((eachOne) => {
        eachOne.trade.money > 0 ? wins++ : losses++;
      });
      let percent = Math.ceil((wins / (wins + losses)) * 100);
      // console.log(wins, "--=-=-=-==--=-=-", losses)

      if (percent) {
        // setState({traders.: {wlr: percent}})
        return percent.toString() + "%";
      } else return null;
    }
  };

  const totalTrades = (user) => {
    if (props.actualTrades) {
      let copyTrades = [...props.actualTrades.data];
      let userTrades = copyTrades.filter((eachTrade) => {
        return eachTrade.trade.trader === user;
      });
      if (userTrades.length > 0) {
        // setState({traders: {totalTrades: userTrades.length}})
        //console.log(state)
        return userTrades.length;
      }
    }
  };

  const showConnections = () => {
    if (props.allTraders && props.user) {
      let copyTraders = [...props.allTraders.data];
      let filteredTraders = copyTraders.filter((eachTrader) => {
        return props.user.connections.includes(eachTrader._id);
        //loop through props.user to get connections and
        //only return those that match you know
      });
      return filteredTraders.map((eachOne) => {
        return (
          <Link className="home-card" to={`/profile/${eachOne.username}`}>
            <div className="trade-ideas-card">
              <div className="trade-ideas-card-more">visit profile</div>

              <div className="trade-ideas-card-link">
                <div className="trade-ideas-card__item">
                  <div className="trade-ideas-card__item-title-home">
                    <div>
                      {eachOne.avatar ? (
                        <img
                          className="trade-ideas-card__item__image"
                          src={eachOne.avatar}
                          alt="avatar"
                        />
                      ) : (
                        <div className="trade-ideas-card__item__image-default"></div>
                      )}
                    </div>
                    <div className="trade-ideas-card__item-title-home-text">
                      {eachOne.username}
                    </div>
                  </div>
                </div>
                {eachOne.created_at && (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      User since:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {formatTime(eachOne.created_at)}
                    </div>
                  </div>
                )}
                {winLossRatio(eachOne.username) && (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      Win Loss Ratio:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {winLossRatio(eachOne.username)}
                    </div>
                  </div>
                )}
                {totalTrades(eachOne.username) ? (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      Total Trades:
                    </div>
                    <div className="trade-ideas-card__item-content">
                      {totalTrades(eachOne.username)}
                    </div>
                  </div>
                ) : (
                  <div className="trade-ideas-card__item">
                    <div className="trade-ideas-card__item-title">
                      This user has no trades posted
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      });
    }
  };

  return (
    <Fragment>
      <div className="trade-ideas">{showConnections()}</div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  if (state.auth) {
    console.log("state",state)
    return {
      allTraders: state.allProfiles,
      actualTrades: state.allTrades,
      user: state.auth.data,
    };
  } else return { allTraders: state.allProfiles, actualTrades: state.allTrades };
};

export default connect(mapStateToProps, {
  fetchAllTrades,
  fetchAllTraders,
  checkLogin,
})(Connections);
