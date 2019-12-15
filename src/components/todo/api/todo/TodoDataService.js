import Axios from 'axios';
import {API_URL,JPA_API_URL} from '../../../../Constants'

class TodoDataService{

    retrieveAllTodos(username){
        return Axios.get(`${JPA_API_URL}/users/${username}/todos`);
    }

    deleteTodoById(id, username){
        return Axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`);
    }

    retrieveTodo(id, username){
        return Axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`);
    }

    updateTodo(id, username, todo){
        return Axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo);
    }

    createTodo(username, todo){
        return Axios.post(`${JPA_API_URL}/users/${username}/todos`, todo);
    }

}

export default new TodoDataService();