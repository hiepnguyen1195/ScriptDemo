import React, { Component } from 'react';
// import { AUTH_TOKEN } from './constants';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
    state = {
        login: true,
        firstname: '',
        lastname: '',
        pass: ''
    }

    render() {
        return (
        <div>
            <h4 className="mv3">Login</h4>
            <form>
                <div className="form-group">
                    <input
                        className = "form-control"
                        value = {this.state.lastname}
                        onChange = {e => this.setState({lastname: e.target.value })}
                        type = 'text'
                        placeholder = "Your Name" 
                    />
                </div>
                <div className="form-group">
                    <input
                        className = "form-control"
                        value = {this.state.pass}
                        onChange = {e => this.setState({pass: e.target.value })}
                        type = 'password'
                        placeholder = "Your Password" 
                    />
                </div>
                <button className="btn btn-primary" onClick={() => this._confirm()}>Login</button>
            </form>
        </div>
    )}

    _confirm = async () => {
        try {
            const { lastname, pass } = this.state;
            const result = await this.props.login({
                variables: {
                    lastname,
                    pass,
                },
            });
            console.log(result);
            // const { token } = result.data.login;
            // this._saveUserData(token);
            // this.props.history.push(`/`);
        } catch (err) {
            console.log(err);
        }
    }
    
    // _saveUserData = token => {
    //     localStorage.setItem(AUTH_TOKEN, token)
    // }
}


const LOGIN_QUERY= gql`
  query LoginMutation($lastname: String!, $pass: String!) {
    login(lastname: $lastname, pass: $pass) {
        lastname
        pass
    }
  }
`
export default graphql(LOGIN_QUERY, { name: 'login' }) (Login)