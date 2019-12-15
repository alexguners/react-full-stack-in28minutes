import React, {Component} from 'react';
import TodoDataService from './api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import moment from 'moment'

class ListTodosComponent extends Component{
    constructor(){
        super();

        this.state = {
            todos : [],
            message : null
            
        }
    }

    componentDidMount(){

        this.refreshTodos();
        
    }

    refreshTodos = () =>{
        let username = AuthenticationService.getLoggedInUserName();

        TodoDataService.retrieveAllTodos(username)
        .then( response => {
            this.setState({todos : response.data});
        })
    }

    render(){
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message!=null && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo => <tr key={todo.id}>
                                                <td>{todo.description}</td>
                                                <td>{todo.done.toString()}</td>
                                                <td>{moment(todo.targetDate.toString()).format("YYYY-MM-DD")}</td>
                                                <td><button className='btn btn-success' onClick={() =>this.updateTodo(todo.id, AuthenticationService.getLoggedInUserName())}>Update</button></td>
                                                <td><button className='btn btn-warning' onClick={() =>this.deleteTodoById(todo.id, AuthenticationService.getLoggedInUserName())}>Delete</button></td>
                                            </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className='row'>
                            <button className='btn btn-success' onClick={ () => this.addTodo() }>Add</button>
                    </div>
                </div>
            </div>
        )
    }

    deleteTodoById =(id,name) =>{
        TodoDataService.deleteTodoById(id,name)
        .then(response =>{
            this.setState({message: 'Deleted Todo successful'})
            this.refreshTodos()
        })
        .catch(error =>{
            console.log(error.data);
        })
    }

    updateTodo =(id,name) =>{
        console.log('update');
        this.props.history.push(`/todos/${id}`)
    }

    addTodo =() =>{
        console.log('add');
        this.props.history.push(`/todos/-1`)
    }

    


}

export default ListTodosComponent;