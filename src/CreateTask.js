import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state={
            titleInput: '',
            descriptionInput: '',
          }
        }

    submitForm = (theEvent) => {
        theEvent.preventDefault();
        const url = "http://localhost:5000/api/tasks/create";
        const body = {
            title: this.state.titleInput,
            description: this.state.descriptionInput,
        }
        const headers = { withCredentials: true};

        axios.post(url, body, headers).then((response) => {
            // console.log('response from the post of tasks', response)

            this.props.fetchTasks();
            this.setState({
                titleInput: '',
                descriptionInput: '',
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    updateInput = (theEvent) => {
        const { name, value } = theEvent.target;
        this.setState({[name]: value});
      }

    render() {
        return(
            <div>
                This is the create task Component

                <form onSubmit={e => this.submitForm(e)}> 
                    <h4> Add a New Task To The List</h4>
                    <label> Title</label>
                    <input name="titleInput" value={this.state.titleInput} onChange={e => this.updateInput(e)}/>

                    <label> Description</label>
                    <textarea name="descriptionInput" value={this.state.descriptionInput} onChange={e => this.updateInput(e)}/>

                    <button>Create</button>
                </form>


            </div>
        )
    }

}

    export default CreateTask;