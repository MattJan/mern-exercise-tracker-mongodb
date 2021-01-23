import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercise (props) {

    const [date, setDate] = useState(new Date())

    const [state, setState] = useState({})

    const [users, setUsers] = useState([])

  const formRef = useRef(null)

  useEffect(() => {
    
    axios.get('http://localhost:3420/exercises/' + props.match.params.id)
    .then(response => {
      setState({
        username: response.data.username,
        description: response.data.description,
        duration: response.data.duration,
        date: response.data.date
      })
      console.log('exercise useeffect response', response)
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])
    
    useEffect(() => {
    axios.get('http://localhost:3420/users/')
    .then(response => {
      if (response.data.length > 0) {
        setUsers(
          response.data.map(user => user.username)
          )
        }
        console.log('user useEffect response', response)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function onChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function onChangeDate(date) {
    setDate(date)
  }

  function onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: date
    }

    console.log(exercise);

    axios.post('http://localhost:3420/exercises/update/' + props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

    return (
    <div>
      <h3>Edit Exercise Entry</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
            ref={formRef}
            required
            className="form-control"
            value={state.username}
            name={'username'}
            onChange={onChange}
            selected={state.username}
            >
            {
              // console.log('state: ', state)
              // &&
              users.map(function (user) {
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
          <input  type="text"
              required
              className="form-control"
              value={state.description}
              name={'description'}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={state.duration}
              name={'duration'}
              onChange={onChange}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={date => onChangeDate(date)}
              // onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }

  export default EditExercise;