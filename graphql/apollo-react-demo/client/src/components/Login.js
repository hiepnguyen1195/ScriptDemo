import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends Component {
    state = {
        login: true,
        firstname: '',
        lastname: '',
        pass: ''
    }

    render() {
        console.log(this.props.login);
        return (
        <div>
            <h4 className="mv3">Login</h4>
            {!this.state.login && (
                <div className="form-group">
                    <input
                        className = "form-control"
                        value = {this.state.firstname}
                        onChange = {e => this.setState({firstname: e.target.value })}
                        type = "text"
                        placeholder = "Your first name"
                    />
                </div>
            )}
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
                <div className="form-group">
                    <button className="btn btn-success" onClick={() => this._confirm()}>
                        {this.state.login ? 'Login' : 'Create account'}
                    </button>
                    <button className="ml5 btn btn-primary" 
                            onClick={() => this.setState({ login: !this.state.login })}>
                        {this.state.login ? 'Need to create an account ?' : 'Already have an account ?'}
                    </button>
                </div>
        </div>
    )}

    _confirm = async () => {
        const { lastname, pass, firstname } = this.state;
        if (this.state.login) {
            try {
                const result = await this.props.loginQuery({
                    variables: {
                        lastname,
                        pass,
                    },
                });
                console.log(result);
                const token = result.data.login;
                this._saveUserData(token);
                this.props.history.push(`/`);
            } catch (err) {
                alert("Tài khoản hoặc mật khẩu không đúng !");
            }
        }else{
            try {
                const result = await this.props.signUp({
                    variables: {
                    firstname,
                    lastname,
                    pass,
                    }
                });
                console.log(result);
                const token = result.data.signUp;
                this._saveUserData(token);
                this.props.history.push(`/`);
            } catch (err) {
                console.log(err);
            }
        }
    }
    
    _saveUserData = token => {
        localStorage.setItem("auth-token", token)
    }
}


const LOGIN_MUTATION= gql`
  mutation Login($lastname: String!, $pass: String!) {
    login(lastname: $lastname, pass: $pass) {
        token
    }
  }
`
const SIGNUP_MUTATION= gql`
  mutation SignUp($firstname: String!, $lastname: String!, $pass: String!) {
    signUp(firstname: $firstname, lastname: $lastname, pass: $pass) {
        token
    }
  }
`
export default compose(
    graphql(LOGIN_MUTATION, { name: 'loginQuery' }),
    graphql(SIGNUP_MUTATION, { name: 'signUp' })
) (Login)