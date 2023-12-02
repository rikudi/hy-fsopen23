import React from "react";

//header component
const Header = (props) => 
{
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  )
}

//part component
const Part = (props) => {
  return (
    <p> {props.part.name} {props.part.exercises} </p>
  )
}
//course content component
const Content = (props) => 
{
  return (
    //iterate through parts array and render part components, using the part object as property
    <div>
      {props.parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}
//total component, sums the total exercises value.
const Total = (props) => 
{
  //sum the total value and assign it to a constant 'total'
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p><strong>Number of exercises: {total}</strong></p>
    </div>
  );
}

const Course = (props) => 
{
  return (
    <div>
        <Header header={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts}  />
    </div>
  )
}

export default Course;