import React from 'react';
import AuthService from '../AuthService/AuthService';

export default function withAuth(AuthComponent){
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component {
        constructor() {
            super();
            this.state = {
                user:null
            }
         }

         componentWillMount() {
               if(!Auth.loggedIn())
                   this.props.history.replace('/login');
               else {
                 try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user:profile
                    })
                  }
                 catch (e) {
                      Auth.logout();
                      this.props.history.replace('/');
                    }
                }
            }
          render() {
              if(this.state.user) {
                  return(
                      <AuthComponent {...this.props} {...this.state} />
                  )
              }
              else {
                return null;
              }
           }
        }
    }
