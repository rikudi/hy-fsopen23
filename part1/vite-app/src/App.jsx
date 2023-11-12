const Header = (props) => 
{
  return (
    <div>
      <p>{props.course}</p>
    </div>
  )
}


const Part = (props) => {
  return (
    <p> {props.part.name} {props.exercise.exercises} </p>
  )
}

const Content = (props) => 
{
  return (
    <div>
      <Part part={props.part1} exercise={props.part1} />
      <Part part={props.part2} exercise={props.part2} />
      <Part part={props.part3} exercise={props.part3} />
    </div>
  )
}

const Total = (props) => 
{
  return (
    <div>
      <p>Number of exercises: {props.exercise1 + props.exercise2 + props.exercise3}</p>
    </div>
  )
}

//Root
const App = () => 
{
  const course = 
  {
    name: "Half Stack Application Development",
    parts: 
    [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using  props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

    return (
      <div>
          <Header course={course.name} />
          <Content 
            part1={course.parts[0]} 
            part2={course.parts[1]}  
            part3={course.parts[2]} 
          />
          <Total exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises}  />
      </div>
  )
}


export default App