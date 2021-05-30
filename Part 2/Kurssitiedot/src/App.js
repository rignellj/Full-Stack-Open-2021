import React from 'react';

import Course from './components/Course';

const App = ({ courses }) => {
  return (
    <React.Fragment>
      {courses.map(course => <Course key={course.id} course={course} /> )}
    </React.Fragment>
  );
}

export default App;
