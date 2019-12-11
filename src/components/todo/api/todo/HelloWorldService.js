import Axios from "axios";

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