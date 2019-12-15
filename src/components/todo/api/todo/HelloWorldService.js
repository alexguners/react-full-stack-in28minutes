import Axios from "axios";
import AuthenticationService from "../../AuthenticationService";

class HelloWorldService {

    executeHelloWorldService = () =>{
        return Axios.get('http://localhost:8080/hello');
    }

    executeHelloWorldBeanService = () =>{
        return Axios.get('http://localhost:8080/hello-world-bean');
    }

    executeHelloWorldPathVariableService = (name) =>{
        return Axios.get(`http://localhost:8080/hello-world-bean/${name}`);
    }


}

export default new HelloWorldService();