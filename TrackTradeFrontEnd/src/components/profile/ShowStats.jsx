import React, { Component } from 'react'
import actions from '../../services/index'
import CanvasJSReact from '../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


let lastFiveDataPoints = [];
let winLossDataPoints = [];
let currencyPerformance = [];

export default class ShowStats extends Component {

    state = {
        currentChart: 'allTrades'
    }
    
    async componentDidMount() {
        let actualTrades = await actions.getTrades();
        this.setState({actualTrades})
        console.log(this.state)
        
        
        let trades = this.state.actualTrades.data
        var chart = this.chart;
        let wins = 0;
        let losses = 0;
		for (var i = 0; i < trades.length; i++) {
            let pips;
            let num;
            let cuancerPerformCalc;

            //sell not jpy
            if(trades[i].trade.kind === 'sell' && !trades[i].trade.currency.includes("JPY")){
                pips = Math.ceil((trades[i].trade.entry * 10000) - (trades[i].trade.close * 10000))
            }
            //sell jpy
            else if(trades[i].trade.kind === 'sell' && trades[i].trade.currency.includes("JPY")){
                pips = Math.ceil((trades[i].trade.entry * 100) - (trades[i].trade.close * 100))
            }
            //buy not jpy
            else if(trades[i].trade.kind === 'buy' && !trades[i].trade.currency.includes("JPY")){
                pips = trades[i].trade.close - trades[i].trade.entry
            }
            //buy jpy
            else if(trades[i].trade.kind === 'buy' && trades[i].trade.currency.includes("JPY")){
                pips = trades[i].trade.close - trades[i].trade.entry
            }
            console.log(pips)
            
            pips > 0 ? wins++ : losses++

            // trades.map(eachTrade=>{
            //     return eachTrade.trade.currency
                
            // })
            
            lastFiveDataPoints.push({
                // x: new Date(this.state.actualTrades.data[i].created_at),
                x: num,
                y: pips * trades[i].trade.lot * 10
            });

            winLossDataPoints = [
                { y: wins, label: "Wins", color: '#2c1' },
                { y: losses, label: "Losses", color: '#d21' }
            ]

            num++;
            
			}
		chart.render();
    }
    
    deleteCard = async id => {
        try {
            await actions.deleteIdeas({cardId: id});
            let actualTrades = await actions.getIdeas();
            this.setState({actualTrades})
        }
        catch(err) {
            console.log('--=-=-=-=-=-=-=', err)
        }
    }

    render() {
        // dataPoints = [];
        let options = {
            animationEnabled: true,
            zoomEnabled: true,
			theme: "light1",
			title: {
				text: "Stats"
			},
			axisY: {
                title: "Profit/Loss",
                prefix: "$",
				includeZero: false
            },
            axisX: {
                title: "Number of Trade",
                prefix: "",
				includeZero: true
			},
			data: [{
				type: "spline",
				xValueFormatString: "Trade #",
				yValueFormatString: "$0",
				dataPoints: lastFiveDataPoints
			}]
        }

        if(this.state.currentChart === "allTrades"){
            options = {
                animationEnabled: true,
                zoomEnabled: true,
                theme: "light1",
                title: {
                    text: "All Trades"
                },
                axisY: {
                    title: "Profit/Loss",
                    prefix: "$",
                    includeZero: false
                },
                axisX: {
                    title: "Number of Trade",
                    prefix: "",
                    includeZero: true
                },
                data: [{
                    type: "spline",
                    xValueFormatString: "Trade #",
                    yValueFormatString: "$0",
                    dataPoints: lastFiveDataPoints
                }]
            }
        }
        else if(this.state.currentChart === "winLoss"){
            options = {
                exportEnabled: true,
                animationEnabled: true,
                theme: "light1",
                title: {
                    text: "Win Loss Ratio"
                },
                data: [{
                    type: "pie",
                    startAngle: 0,
                    toolTipContent: "<b>{label}</b>: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    dataPoints: winLossDataPoints
                }]
            }
        }
        else if(this.state.currentChart === "curPerformance") {
            options = {
                theme: 'light   1',
                title: {
                    text: "Basic Column Chart"
                },
                data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                        { label: "Apple",  y: -10  },
                        { label: "Orange", y: 15  },
                        { label: "Banana", y: 25  },
                        { label: "Mango",  y: 30  },
                        { label: "Grape",  y: 28  }
                    ]
                }
                ]
            }
        }
        
        // console.log(this.state)
        console.log(winLossDataPoints)
        return (
            <div className="profile-stats">
                
                <ul className="profile-stats-nav__links">
                    <li className={this.state.currentChart === "allTrades" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"allTrades"})}>All Trades</li>
                    <li className={this.state.currentChart === "winLoss" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"winLoss"})}>Win Loss Ratio</li>
                    <li className={this.state.currentChart === "curPerformance" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"curPerformance"})}>Currency Performance</li>
                    <li className={this.state.currentChart === "connections" ? "profile-stats-nav__links-text-active" : "profile-stats-nav__links-text"} onClick={() => this.setState({currentChart:"connections"})}>Connections</li>
                </ul>
                <div className="profile-stats-chart">
                    <CanvasJSChart options = {options} 
                        onRef={ref => this.chart = ref}
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            </div>
        )
    }
}
