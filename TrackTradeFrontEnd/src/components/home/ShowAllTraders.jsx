import React, { Component, Fragment } from 'react'
import actions from '../../services/index'
import { Link } from 'react-router-dom';


export default class ShowAllTraders extends Component {
    state = {}
    
    async componentDidMount() {
        let allTraders = await actions.getAllTraders();
        this.setState({allTraders: allTraders.data})
        this.setState({traders: allTraders.data})
        console.log(this.state)
        let actualTrades = await actions.getAllTrades();
        this.setState({actualTrades: actualTrades.data})
    }

    formatTime = (time) => String(new Date(time)).substring(0,24)

    winLossRatio = (user) => {

        if(this.state.actualTrades){
            let wins = 0;
            let losses = 0;

            let copyTrades = [...this.state.actualTrades]
            let userTrades = copyTrades.filter(eachTrade => {
                return eachTrade.trade.trader === user
            })
            // console.log(userTrades)
            userTrades.forEach(eachOne => {
                eachOne.trade.money > 0 ? wins++ : losses++
            })
            let percent = Math.ceil((wins / (wins + losses)) * 100)
            // console.log(wins, "--=-=-=-==--=-=-", losses)

            if(percent) {
                // this.setState({traders.: {wlr: percent}})
                this.state.traders.map(eachTrader => {
                    if(eachTrader.username === user){
                        eachTrader["wlr"] = percent
                    }
                })
                return percent.toString() + "%"
            } else return null
        }
    }

    totalTrades = (user) => {
        if(this.state.actualTrades){
            let copyTrades = [...this.state.actualTrades]
            let userTrades = copyTrades.filter(eachTrade => {
                return eachTrade.trade.trader === user
            })
            if(userTrades.length > 0){
                this.state.traders.map(eachTrader => {
                    if(eachTrader.username === user){
                        eachTrader["totalTrades"] = userTrades.length
                    }
                })
                return userTrades.length
            }
        }
    }

    searchTraders = (e) => {
        let tradersList = [...this.state.allTraders]
        let filteredTraders = tradersList.filter(eachTrader=>{
          return eachTrader.username.toLowerCase().includes(e.target.value.toLowerCase())      
        })
        console.log(filteredTraders)
        if(filteredTraders){
          this.setState({
            traders:filteredTraders
          })
        }
    }

    sortTraders = (e) => {
        console.log(e.target.value)
        if(e.target.value === ""){
            this.setState({traders:this.state.allTraders})
        }
        else if(e.target.value === "wlr-best"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((b,a) => {
                
                return a.wlr - b.wlr
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "wlr-worst"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((a,b) => {
                
                return a.wlr - b.wlr
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "total-most"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((b,a) => {
                
                return a.totalTrades - b.totalTrades
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "total-least"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((a,b) => {
                
                return a.totalTrades - b.totalTrades
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "joined-newest"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((b,a) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at)
                
            })
            this.setState({traders: tradersList})            
        }
        else if(e.target.value === "joined-oldest"){
            let tradersList = [...this.state.allTraders]
            tradersList.sort((a,b) => {
                // console.log(a.created_at, "-----", b.created_at)
                return a.created_at.localeCompare(b.created_at)
                
            })
            this.setState({traders: tradersList})            
        }
        
    }

    showTraders = () => {
        if(this.state.traders){
            // console.log(this.state.traders)
            return this.state.traders.map(eachTrader=>{
                return (
                    <Link className="home-card" to={`/profile/${eachTrader.username}`} >
                    <div className="trade-ideas-card">
                    <div className="trade-ideas-card-more">visit profile</div>
                    
                    <div className="trade-ideas-card-link">
                        
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title-home">
                                <div>
                                {eachTrader.avatar ?
                                <img className="trade-ideas-card__item__image" src={eachTrader.avatar} alt="avatar"/>
                                :
                                <div className="trade-ideas-card__item__image-default"></div>      
                                }
                                </div>
                                <div className="trade-ideas-card__item-title-home-text">
                                    {eachTrader.username}
                                </div>
                            </div>
                        </div>
                        {
                        eachTrader.created_at &&
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                User since:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {this.formatTime(eachTrader.created_at)}
                            </div>
                        </div>
                        }
                        {this.winLossRatio(eachTrader.username) &&
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Win Loss Ratio:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {this.winLossRatio(eachTrader.username)}
                            </div>
                        </div>
                        }
                        {this.totalTrades(eachTrader.username) ?
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                Total Trades:
                            </div>
                            <div className="trade-ideas-card__item-content">
                                {this.totalTrades(eachTrader.username)}
                            </div>
                        </div>
                        :
                        <div className="trade-ideas-card__item">
                            <div className="trade-ideas-card__item-title">
                                This user has no trades posted
                            </div>
                        </div>
                        }
                        
                    </div>
                    </div>
                    </Link>
                )
            })
        }
        else {
            return null
        }
    }
    
    render() {
        return (
            <Fragment>
            <div className="home-content-search-sort">
                <div className="home-content-section1">
                    <input onChange={this.searchTraders} className="home-content--search" type="text" placeholder="Search for traders by their username" />
                    <label className="home-content--label" htmlFor="sort">Sort By:</label>
                    <select name="sort" className="home-content--select" onChange={this.sortTraders}>
                        <option value="">-</option>
                        <option value="wlr-best">Win Loss Ratio: best</option>
                        <option value="wlr-worst">Win Loss Ratio: worst</option>
                        <option value="total-most">Total Trades: most</option>
                        <option value="total-least">Total Trades: least</option>
                        <option value="joined-newest">Joined: newest</option>
                        <option value="joined-oldest">Joined: oldest</option>
                    </select>
                </div>
            </div>            
            <div className="trade-ideas">
                {this.showTraders()}
            </div>
            </Fragment>
        )
    }
}