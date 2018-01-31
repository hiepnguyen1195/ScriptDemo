import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem("auth-token");
    return (
      <div className="container">
        <div className="row">
          <div className="page-header">
            <h2>Graphql Client</h2>
          </div>
        </div>
        <div className="row">
          <ul className="nav nav-pills">
            <li>
              <Link to="/" className="ml1 no-underline black">List Post</Link>
            </li>
            <li>
              <Link to="/create" className="ml1 no-underline black">Create Post</Link>
            </li>
            <li className ="pull-right">
              {authToken ? (
                <div
                  className="ml1 pointer black"
                  onClick={() => this._logout()}>
                  logout
                </div>
              ) : (
                <Link to="/login" className="ml1 no-underline black">
                  login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    )
  }
  _logout = () => {
    localStorage.removeItem("auth-token")
    this.props.history.push(`/`)
  }
}

export default withRouter(Header)