import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise() {

  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: []
  })

  const inputRef = useRef(null)

  // constructor(props) {
  //   super(props);

  //   onChangeUsername = this.onChangeUsername.bind(this);
  //   this.onChangeDescription = this.onChangeDescription.bind(this);
  //   this.onChangeDuration = this.onChangeDuration.bind(this);
  //   this.onChangeDate = this.onChangeDate.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);

  // state = {
  //   username: '',
  //   description: '',
  //   duration: 0,
  //   date: new Date(),
  //   users: []
  // }

  useEffect(() => {
    axios.get('http://localhost:3420/users/')
      .then(response => {
        if (response.data.length > 0) {
          setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  // onChangeUsername(e) {
  //   setState({
  //     username: e.target.value
  //   })
  // }

  // onChangeDescription(e) {
  //   setState({
  //     description: e.target.value
  //   })
  // }

  // onChangeDuration(e) {
  //   setState({
  //     duration: e.target.value
  //   })
  // }

  // onChangeDate(date) {
  //   setState({
  //     date: date
  //   })
  // }

  function onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date
    }

    console.log(exercise);

    axios.post('http://localhost:3420/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref={inputRef}
            required
            className="form-control"
            value={state.username}
            onChange={handleChange}>
            {
              state.users.map(function (user) {
                return <option
                  key={user}
                  value={user}>{user}
                </option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={state.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={state.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateExercise;