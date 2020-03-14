import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import actions from '../../services/index'

export default class Header extends Component {

    logOut = async () => {
        let res = await actions.logOut()
        this.props.history.push('/')
        window.location.reload()
    }

    render() {
            
            if(!this.props.loggedIn){
            return (<nav>    
                <div className="navigation">
                    <Link to="/" className="navigation--brand">Track Trade</Link>
                    <ul className="navigation--right">
                    <li id="about"><Link className="navigation--link navigation--login" to="/log-in">Log In</Link></li>
                    <li id="contact"><Link className="navigation--link navigation--signup" to="/sign-up">Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
            )
            } else {
                
                return (
                <nav>    
                    <div id="main" className="navigation">
                        <Link to="/" className="navigation--brand">Track Trade</Link>
                        <ul className="navigation--right">
                            <li id="profile-dropdown">
                                <div href="#click" class="menu">
                                <h2 class="menu-title"><span className="menu-title-text" >{this.props.username}</span><span className="menu-title-arrow">&#10151;</span></h2>
                                <ul class="menu-dropdown">
                                    <li><Link className="menu-link" to="/profile">Profile</Link></li>
                                    <li><Link className="menu-link" to="/postIdea">Post Idea</Link></li>
                                    <li><Link className="menu-link" to="/postTrade">Post Trade</Link></li>
                                    <li><Link className="menu-link" to="/tools">Tools</Link></li>
                                </ul>
                                </div>


                            </li>
                            <li id="contact"><Link onClick={this.logOut} className="navigation--link navigation--signup" to="/">Log Out</Link></li>
                        </ul>
                    </div>
                </nav>

                )

                
            }

            
        
    }
}
