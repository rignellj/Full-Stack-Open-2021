import React, { useState } from 'react';
import './App.css';

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} type="button">
      {text}
    </button>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  
  const nextAnecdoteHandler = () => setSelected(Math.floor(Math.random() * 6));
  
  const voteHandler = () => {
    const newArray = [ ...votes ];
    newArray[selected]++;
    setVotes(newArray);
  };

  const indexWithMostVotes = votes.indexOf(Math.max(...votes));

  return (
    <React.Fragment>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button text="Vote" onClick={voteHandler} />
      <Button text="Next Anecdote" onClick={nextAnecdoteHandler} />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[indexWithMostVotes]}</p>
      <p>Has {votes[indexWithMostVotes]} votes</p>
    </React.Fragment>
  );
};

export default App;
