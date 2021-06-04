import React from 'react';

const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;

const Total = ({ total }) => <p>Number of exercises {total}</p>;

const Content = ({ parts }) => {
	return (
		<React.Fragment>
			{parts.map(part =>
				<Part
					key={part.id}
					name={part.name}
					exercises={part.exercises}
				/>
			)}
		</React.Fragment>
	);
};

const Course = ({ course }) => {
	const reducer = (accumulator, currentValue) => {
		return {
			exercises: accumulator.exercises + currentValue.exercises
		};
	};
	const { name, parts } = course;
	const { exercises } = parts.reduce(reducer);

	return (
		<React.Fragment>
			<Header name={name} />
			<Content parts={parts} />
			<Total total={exercises}/>
		</React.Fragment>
	);
};

export default Course;
