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

//Root
const App = () => 
{
  const course = 
  {
    name: "Half Stack Application Development", 
    id: 1,
    parts: 
    [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using  props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Best part',
        exercises: 99,
        id: 4
      }
    ]
  }

    return (
      <div>
        <Course course={course} />
      </div>
  )
}


export default App