import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CreateTask from './CreateTask';
import EditTask from './EditTask';


class TaskList extends Component {
    constructor(props) {
        super(props)
        this.state={
            tasks: [],
            formShowing: null,
          }
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks = () => {
        const url = 'http://localhost:5000/api/tasks';
        axios.get(url)
        .then((response) => {
            this.setState({tasks: response.data})
        }).catch((err) => {
            console.log(err)
        })
    }

    showForm = (theId) => {
        console.log('what does the id equal', theId)
        console.log('what the formshowing equal', this.state.formShowing)

        if (theId === this.state.formShowing) {
            this.setState({ formShowing: null })
        } else if (!this.state.formShowing) {
            this.setState({formShowing: theId })

        }

    }

    showTheTasks = () => {
        if (this.state.tasks.length) {
            return this.state.tasks.map((eachTask, index) => {
                return (
                <div className="task" key={eachTask._id}> 
                    <h4>{eachTask.title}</h4>
                    <p> {eachTask.description}</p>
                    <button className="task-button" onClick={() => this.deleteTask(eachTask._id)}> 
                        Delete 
                    </button>
                    
                    <button className="edit-task" onClick={() => this.showForm(eachTask._id)}>edit</button>
                    { this.state.formShowing === eachTask._id &&
                         <EditTask fetchTasks={this.getTasks} theTask={eachTask} hideForm={this.showForm}/>}
                </div>
                )
            })
        }
    }

    deleteTask = (theId) => {
        const url = `http://localhost:5000/api/tasks/delete/${theId}`
        const body = {}; 
        axios.post(url, body)
        .then(() => {
            this.getTasks();
        })
    }


    render() {
        return (
            <div className="tasklist">
                THIS IS THE TASKLIST
                <CreateTask {...this.props} fetchTasks={this.getTasks} />

                {this.showTheTasks()}
            </div>
        )
    }
}

export default TaskList;