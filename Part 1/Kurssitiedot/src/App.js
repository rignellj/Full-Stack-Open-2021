import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  );
};

const Part = (props) => {
  return (
      <p>
        {props.name} {props.exercises}
      </p>
  );
};

const Content = (props) => {
  return (
      <Part name={props.name} exercises={props.exercises} />
  );
};

const Total = (props) => {
  return (
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  );
};

const App = () => {
  const { name: renamedName, parts } = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <React.Fragment>
      <Header course={renamedName} />
       {parts.map(part => <div key={uuidv4()}><Content name={part.name} exercises={part.exercises} /></div>)}
      <Total
        exercises1={parts[0].exercises}
        exercises2={parts[1].exercises}
        exercises3={parts[2].exercises}
      />
    </React.Fragment>
  );
}

export default App;
