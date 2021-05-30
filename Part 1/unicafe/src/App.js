import React, { useState } from 'react';

import './App.css';

const Header = () => {
  return <h1>Give feedback</h1>
};

const Button = ({ option, clickHandler }) => {
  const handleClick = (event) => {
    clickHandler(prevValue => prevValue + 1);
  };
  return (
    <button
      value={option}
      type="submit"
      onClick={handleClick}
    >
      {option}
    </button>
  );
};

const StatisticsLine = ({ text, value, percent }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {percent ? '%' : ''}</td> 
    </tr>
  );
};

const Statistics = ({ goods, neutrals, bads }) => {
  const all = goods + neutrals + bads;
  const positive = all === 0 ? 0 : goods / all * 100;
  let content;

  if (all === 0) {
    content = <p>No feedback given</p>
  } else {
    content = (
      <React.Fragment>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={goods} />
            <StatisticsLine text="neutral" value={neutrals} />
            <StatisticsLine text="bad" value={bads} />
            <StatisticsLine text="all" value={all} />
            <StatisticsLine text="positive" percent={true} value={positive} />
          </tbody>
        </table>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
};

const  App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <React.Fragment>
      <Header />
      <Button
        option="Good"
        clickHandler={setGood}
        value={good}
      />
      <Button
        option="Neutral"
        clickHandler={setNeutral}
        value={neutral}
      />
      <Button
        option="Bad"
        clickHandler={setBad}
        value={bad}
      />
      <Statistics goods={good} neutrals={neutral} bads={bad} />
    </React.Fragment>
  );
}

export default App;
