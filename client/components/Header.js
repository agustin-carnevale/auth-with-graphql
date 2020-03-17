import React, { Component } from 'react'
import {Link, hashHistory} from 'react-router'
import {graphql} from 'react-apollo'
import currentUserQuery from '../queries/currentUser'
import logoutMutation from '../mutations/Logout'

class Header extends Component{
    renderButtons(){
        const {loading, currentUser} = this.props.data

        if (loading) return null

        if (currentUser){
            return (<li>
                <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
            </li>)
        }else{
            return (<div>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </div>)
        }
    }

    onLogoutClick(){
        this.props.mutate({
            refetchQueries: [{query: currentUserQuery}]
        })
    }

    render(){
        return(
        <header>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        </header>
        )
    }
}


export default graphql(logoutMutation)(
 graphql(currentUserQuery)(Header)
)