import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class EditTask extends Component {
    constructor(props) {
        super(props)
        this.state={
            title: '',
            description: '',
            theTask: '',
          }
        }

        componentDidMount() {
            this.setState(this.props.theTask)
        }

        submitForm = (theEvent) => {
            const { title, description } = this.state;
            theEvent.preventDefault();
            const url = `http://localhost:5000/api/tasks/edit/${this.state._id}`;
            const body = {
                title,
                description,
            }
            const headers = { withCredentials: true};
    
            axios.post(url, body, headers).then((response) => {
                // console.log('response from the post of tasks', response)
    
                this.props.fetchTasks();
                this.props.hideForm(this.state.theTask._id)
            }).catch((err) => {
                console.log(err)
            })
        }

        updateInput = (theEvent) => {
        console.log(theEvent.target)
            const { name, value } = theEvent.target;
            this.setState({[name]: value});
          }

        render() {

            return(
                <div>
                    <form onSubmit = {e => this.submitForm(e)}>
                    <label>Title</label>
                    <input name="title" value={this.state.title} onChange={e => this.updateInput(e)} />

                    <label>Description</label>
                    <input name="description" value={this.state.description} onChange={e => this.updateInput(e)} />
                    
                    <button> 
                        Submit Changes
                    </button>
                    </form>
                </div>
            )
        }
    }

    export default EditTask;