import React, { Component } from "react";

//redux imports
import { connect } from "react-redux";
import { fetchTrades } from "../../actions";
import { getAllTrades } from "../../sagas/trades";

import CanvasJSReact from "../../canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

let allTradesDataPoints = [];
let winLossDataPoints = [];
let currencyPerformance = [];

class ShowStats extends Component {
  state = {
    currentChart: "allTrades",
  };

  async componentDidMount() {
    allTradesDataPoints = [];
    winLossDataPoints = [];
    currencyPerformance = [];
    var chart = this.chart;

    if (!this.props.otherProfile) {
      await this.props.fetchTrades();

      let trades = this.props.actualTrades.data;
      let wins = 0;
      let losses = 0;
      let obj = {};
      let totalProfits = 0;
      let totalLosses = 0;

      for (let i = 0; i < trades.length; i++) {
        obj[trades[i].trade.currency] = 0;
      }

      for (let i = 0; i < trades.length; i++) {
        let pips;
        let num;

        //sell not jpy
        if (
          trades[i].trade.kind === "sell" &&
          !trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.entry * 10000 - trades[i].trade.close * 10000
          );
        }
        //sell jpy
        else if (
          trades[i].trade.kind === "sell" &&
          trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.entry * 100 - trades[i].trade.close * 100
          );
        }
        //buy not jpy
        else if (
          trades[i].trade.kind === "buy" &&
          !trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.close * 10000 - trades[i].trade.entry * 10000
          );
        }
        //buy jpy
        else if (
          trades[i].trade.kind === "buy" &&
          trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.close * 100 - trades[i].trade.entry * 100
          );
        }

        if (pips > 0) {
          wins++;
          obj[trades[i].trade.currency] += 1;
        } else {
          losses++;
          obj[trades[i].trade.currency] -= 1;
        }

        allTradesDataPoints.push({
          x: num,
          y: pips * trades[i].trade.lot * 10,
        });

        winLossDataPoints = [
          { y: wins, label: "Wins", color: "#2c1" },
          { y: losses, label: "Losses", color: "#d21" },
        ];

        num++;
      }

      for (let one in obj) {
        currencyPerformance.push({
          label: one,
          y: obj[one],
          color: `${obj[one] > 0 ? "#2c1" : "#d21"}`,
        });
      }

      for (let eachOne of allTradesDataPoints) {
        eachOne.y > 0
          ? (totalProfits += eachOne.y)
          : (totalLosses += eachOne.y);
      }

      this.setState({
        wlr: Math.ceil((wins / (wins + losses)) * 100),
        totalProfits: totalProfits.toFixed(2),
        totalLosses: totalLosses.toFixed(2),
        net: Number(totalProfits.toFixed(2)) + Number(totalLosses.toFixed(2)),
      });

      chart.render();
    } else {
      await getAllTrades();

      let trades = this.props.allTrades;
      let wins = 0;
      let losses = 0;
      let obj = {};
      let totalProfits = 0;
      let totalLosses = 0;

      for (let i = 0; i < trades.length; i++) {
        obj[trades[i].trade.currency] = 0;
      }

      for (let i = 0; i < trades.length; i++) {
        let pips;
        let num;

        //sell not jpy
        if (
          trades[i].trade.kind === "sell" &&
          !trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.entry * 10000 - trades[i].trade.close * 10000
          );
        }
        //sell jpy
        else if (
          trades[i].trade.kind === "sell" &&
          trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.entry * 100 - trades[i].trade.close * 100
          );
        }
        //buy not jpy
        else if (
          trades[i].trade.kind === "buy" &&
          !trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.close * 10000 - trades[i].trade.entry * 10000
          );
        }
        //buy jpy
        else if (
          trades[i].trade.kind === "buy" &&
          trades[i].trade.currency.includes("JPY")
        ) {
          pips = Math.ceil(
            trades[i].trade.close * 100 - trades[i].trade.entry * 100
          );
        }

        if (pips > 0) {
          wins++;
          obj[trades[i].trade.currency] += 1;
        } else {
          losses++;
          obj[trades[i].trade.currency] -= 1;
        }

        allTradesDataPoints.push({
          x: num,
          y: pips,
        });

        winLossDataPoints = [
          { y: wins, label: "Wins", color: "#2c1" },
          { y: losses, label: "Losses", color: "#d21" },
        ];

        num++;
      }

      for (let one in obj) {
        currencyPerformance.push({
          label: one,
          y: obj[one],
          color: `${obj[one] > 0 ? "#2c1" : "#d21"}`,
        });
      }

      this.setState({ wlr: Math.ceil((wins / (wins + losses)) * 100) });

      chart.render();
    }
  }

  render() {
    if (!this.props.otherProfile) {
      let options = {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "dark2",
        backgroundColor: "#081c24",
        title: {
          text: "Stats",
        },
        axisY: {
          title: "Profit/Loss",
          prefix: "$",
          includeZero: true,
        },
        axisX: {
          title: "Number of Trade",
          prefix: "",
          includeZero: true,
        },
        data: [
          {
            type: "spline",
            xValueFormatString: "Trade #",
            yValueFormatString: "$0",
            dataPoints: allTradesDataPoints,
          },
        ],
      };

      if (this.state.currentChart === "allTrades") {
        options = {
          animationEnabled: true,
          animationDuration: 3000,
          zoomEnabled: true,

          theme: "dark2",
          backgroundColor: "#081c24",

          title: {
            text: "ALL TRADES",
            fontFamily: "arial",
            fontColor: "#dddddd",
          },
          subtitles: [
            {
              text:
                "Total gain: $" +
                this.state.totalProfits +
                " | Total lost: $" +
                this.state.totalLosses +
                " | Net: $" +
                this.state.net,
              padding: 10,
            },
          ],
          axisY: {
            title: "Profit/Loss",
            prefix: "$",
            includeZero: false,
          },
          axisX: {
            title: "Number of Trade",
            prefix: "",
            includeZero: true,
          },
          data: [
            {
              type: "spline",
              lineColor: "#2ba7fa",
              lineThickness: 5,
              color: "#dddddd",
              xValueFormatString: "Trade #",
              yValueFormatString: "$0",
              dataPoints: allTradesDataPoints,
            },
          ],
        };
      } else if (this.state.currentChart === "winLoss") {
        options = {
          exportEnabled: true,
          animationEnabled: true,
          theme: "dark2",
          backgroundColor: "#081c24",
          title: {
            text: "WIN LOSS RATIO",
            fontFamily: "arial",
            fontColor: "#dddddd",
          },
          subtitles: [
            {
              text: this.state.wlr + "%",
              padding: 10,
            },
          ],
          data: [
            {
              type: "pie",
              startAngle: 0,
              toolTipContent: "<b>{label}</b>: {y}",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - {y}",
              dataPoints: winLossDataPoints,
            },
          ],
        };
      } else if (this.state.currentChart === "curPerformance") {
        options = {
          theme: "dark2",
          backgroundColor: "#081c24",
          title: {
            text: "CURRENCY PERFORMANCE",
            fontFamily: "arial",
            fontColor: "#dddddd",
          },
          axisY: {
            title: "Wins/Losses",
            includeZero: false,
          },
          axisX: {
            title: "Currency Pair",
            includeZero: true,
          },
          data: [
            {
              type: "column",
              dataPoints: currencyPerformance,
            },
          ],
        };
      }

      console.log(this.state);

      return (
        <div className="profile-stats">
          <ul className="profile-stats-nav__links">
            <li
              className={
                this.state.currentChart === "allTrades"
                  ? "profile-stats-nav__links-text-active"
                  : "profile-stats-nav__links-text"
              }
              onClick={() => this.setState({ currentChart: "allTrades" })}
            >
              All Trades
            </li>
            <li
              className={
                this.state.currentChart === "winLoss"
                  ? "profile-stats-nav__links-text-active"
                  : "profile-stats-nav__links-text"
              }
              onClick={() => this.setState({ currentChart: "winLoss" })}
            >
              Win Loss Ratio
            </li>
            <li
              className={
                this.state.currentChart === "curPerformance"
                  ? "profile-stats-nav__links-text-active"
                  : "profile-stats-nav__links-text"
              }
              onClick={() => this.setState({ currentChart: "curPerformance" })}
            >
              Currency Performance
            </li>
          </ul>
          <div className="profile-stats-chart">
            <CanvasJSChart
              options={options}
              onRef={(ref) => (this.chart = ref)}
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        </div>
      );
    } else {
      let options = {
        animationEnabled: true,
        zoomEnabled: true,
        theme: "dark2",
        backgroundColor: "#081c24",
        title: {
          text: "Stats",
        },
        axisY: {
          title: "Pips",
          prefix: "",
          includeZero: true,
        },
        axisX: {
          title: "Number of Trade",
          prefix: "",
          includeZero: true,
        },
        data: [
          {
            type: "spline",
            xValueFormatString: "Trade #",
            yValueFormatString: "0",
            dataPoints: allTradesDataPoints,
          },
        ],
      };

      if (this.state.currentChart === "allTrades") {
        options = {
          animationEnabled: true,
          animationDuration: 3000,
          zoomEnabled: true,

          theme: "dark2",
          backgroundColor: "#081c24",

          title: {
            text: "ALL TRADES",
            fontFamily: "arial",
            fontColor: "#dddddd",
          },

          axisY: {
            title: "Pips",
            prefix: "",
            includeZero: false,
          },
          axisX: {
            title: "Number of Trade",
            prefix: "",
            includeZero: true,
          },
          data: [
            {
              type: "spline",
              lineColor: "#2ba7fa",
              lineThickness: 5,
              color: "#dddddd",
              xValueFormatString: "Trade #",
              yValueFormatString: "0",
              dataPoints: allTradesDataPoints,
            },
          ],
        };
      } else if (this.state.currentChart === "winLoss") {
        options = {
          exportEnabled: true,
          animationEnabled: true,
          theme: "dark2",
          backgroundColor: "#081c24",
          title: {
            text: "WIN LOSS RATIO",
            fontFamily: "arial",
            fontColor: "#dddddd",
          },
          subtitles: [
            {
              text: this.state.wlr + "%",
              padding: 10,
            },
          ],
          data: [
            {
              type: "pie",
              startAngle: 0,
              toolTipContent: "<b>{label}</b>: {y}",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} - {y}",
              dataPoints: winLossDataPoints,
            },
          ],
        };
      } else if (this.state.currentChart === "curPerformance") {
        options = {
          theme: "dark2",
          backgroundColor: "#081c24",
          title: {
            text: "CURRENCY PERFORMANCE",
            fontFamily: "arial",
            fontColor: "#dddddd",
          },
          axisY: {
            title: "Wins/Losses",
            includeZero: false,
          },
          axisX: {
            title: "Currency Pair",
            includeZero: true,
          },
          data: [
            {
              type: "column",
              dataPoints: currencyPerformance,
            },
          ],
        };
      }

      console.log(this.state);

      return (
        <div className="profile-stats">
          <ul className="profile-stats-nav__links">
            <li
              className={
                this.state.currentChart === "allTrades"
                  ? "profile-stats-nav__links-text-active"
                  : "profile-stats-nav__links-text"
              }
              onClick={() => this.setState({ currentChart: "allTrades" })}
            >
              All Trades
            </li>
            <li
              className={
                this.state.currentChart === "winLoss"
                  ? "profile-stats-nav__links-text-active"
                  : "profile-stats-nav__links-text"
              }
              onClick={() => this.setState({ currentChart: "winLoss" })}
            >
              Win Loss Ratio
            </li>
            <li
              className={
                this.state.currentChart === "curPerformance"
                  ? "profile-stats-nav__links-text-active"
                  : "profile-stats-nav__links-text"
              }
              onClick={() => this.setState({ currentChart: "curPerformance" })}
            >
              Currency Performance
            </li>
          </ul>
          <div className="profile-stats-chart">
            <CanvasJSChart
              options={options}
              onRef={(ref) => (this.chart = ref)}
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return { actualTrades: state.trades.moretrades, allTrades: state.allTrades };
};

export default connect(mapStateToProps, { fetchTrades })(
  ShowStats
);
