import React, { Component } from 'react';
import './Login.css';
import AuthService from '../AuthService/AuthService';

class Login extends Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }
    state = {
        errorLogin : false,
    }
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
          
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input
                            className="form-item"
                            placeholder="Username goes here..."
                            name="username"
                            type="text"
                            required
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            required
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
               this.props.history.replace('/');
            })
            .catch(err =>{
                alert("Проверьте логин или пароль!")
            })
    }
}

export default Login;