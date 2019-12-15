import React, {Component} from 'react';
import AuthenticationService from './AuthenticationService';

class LoginComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            username : 'in28minutes',
            password : '',
            hasLoginFailed: false,
            showMessageSuccess:false
        }
    }

    handleChange = (event) => {
      this.setState (
          {
              [event.target.name]: event.target.value
            }
        )
    }

    loginClick = () =>{        
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then(
            (response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
                this.props.history.push(`/welcome/${this.state.username}`)
                this.setState({showMessageSuccess:true});
                this.setState({hasLoginFailed:false});
            }
        )
        .catch(
            () => {
                this.setState({hasLoginFailed:true});
                this.setState({showMessageSuccess:false});
            }
        )
    }

    render = () => {
        return (
            <div>
                <h1>Login</h1>
                <div className='container'>
                    {this.state.hasLoginFailed && <div className='alert alert-warning'>Invalid Credentials</div>}
                    {this.state.showMessageSuccess && <div>Login Successful</div>}
                    User : <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className='btn btn-success' onClick={this.loginClick}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent;