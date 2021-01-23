import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>edit</Link> | <button onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
    </td>
  </tr>
)

function ExercisesList(props) {
  const [state, setState] = useState({
    exercises: []
  })

  useEffect(() => {
    axios.get('http://localhost:3420/exercises/')
      .then(response => {
        setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  function deleteExercise(id) {
    axios.delete('http://localhost:3420/exercises/' + id)
      .then(response => { console.log(response.data) });

    setState({
      exercises: state.exercises.filter(el => el._id !== id)
    })
  }

  function exerciseList() {
    return state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
    })
  }

    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }

export default ExercisesList;