import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="container">
        <div className="row page-header">
          <h2>Graphql Client</h2>
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
              <Link to="/login"> Login </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)