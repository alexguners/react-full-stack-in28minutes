import axios from 'axios';
import {API_URL, JPA_API_URL} from '../../Constants'

export const  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"

class AuthenticationService{

    executeBasicAuthenticationService(username,password){
        return axios.get(`${API_URL}/basicauth`, {
            headers: {authorization: this.createBasicAuthToken(username,password)}
        })
    }

    executeJwtAuthenticationService(username,password){
        return axios.post(`${API_URL}/authenticate`,{
            username: username,
            password: password
        })
    }

    createBasicAuthToken(username,password){
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return basicAuthHeader;
    }

    createJwtAuthToken(token){
        let basicAuthHeader = 'Bearer ' + token
        return basicAuthHeader;
    }

    registerSuccessfulLogin(username, password){

        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username,password))
    }

    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJwtAuthToken(token))
        
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user==null) return false;
        return true;
    }

    getLoggedInUserName(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user;
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use((config)=>{
            if(this.isUserLoggedIn()){
                config.headers.authorization = token;
            }
            return config;
        })
    }
}

export default new AuthenticationService();