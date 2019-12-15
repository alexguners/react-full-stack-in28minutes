import React,{ Component } from "react";
import moment from 'moment'
import { Formik, Form,Field, ErrorMessage } from "formik";
import TodoDataService from "./api/todo/TodoDataService";
import AuthenticationService from './AuthenticationService';

export class TodoComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            description: '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount(){
        let username = AuthenticationService.getLoggedInUserName();

        
        if(this.state.id === -1){
            return
        }else{
            TodoDataService.retrieveTodo(this.state.id, username)
            .then(response => this.setState({
                description : response.data.description,
                targetDate : moment(response.data.target).format('YYYY-MM-DD')
            }))
        }
        
    }

    onSubmit = (values) =>{
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        }
        console.log(this.state.id===-1);
        if(this.state.id==-1){
            TodoDataService.createTodo(username,todo)
                .then(response =>{
                    this.props.history.push('/todos')
            })
        }else{
            TodoDataService.updateTodo(this.state.id, username,todo)
                .then(response =>{
                    this.props.history.push('/todos')
            })
        }
        
    }

    validate = (values) => {
        let errors = {}
        if(!values.description){
            errors.description = 'Enter a Description';
        }else if(values.description.length <5){
            errors.description = 'Enter at least 5 Characteres in Description';
        }

        if(!moment(values.targetDate).isValid){
            errors.targetDate = 'Enter a valid Target Date  '
        }

        return errors;
    }

    render = () =>{
        let {description, targetDate} = this.state;
        return (
            <>
            <h1>Todo</h1>
            <div className='container'>
                <Formik 
                initialValues={{
                    description ,
                    targetDate
                    }} onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className='form-group'>
                                    <label>Description</label>
                                    <Field className='form-control' type='text' name='description'></Field>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Target Date</label>
                                    <Field className='form-control' type='date' name='targetDate'></Field>
                                </fieldset>
                                <button type='submit' className='btn btn-success'>Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
            </>
        )
    }

    handleChange = (event) => {
        this.setState (
            {
                [event.target.name]: event.target.value
              }
          )
      }

}