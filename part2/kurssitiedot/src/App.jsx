import Course from "./course"

//Root component
const App = () => 
{
  const courses = [
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
  },
  {
    name: "2nd course",
    id: 2,
    parts: 
    [
      {
        name: "introduction to stylesheets",
        exercises: 2,
        id: 1
      },
      {
        name: "Css libraries",
        exercises: 6,
        id: 2
      },
      {
        name: "haloo",
        exercises: 6,
        id: 3
      }
    ]
  }
]
    return (
      /*map thru courses array and render each course. Use key property to identify the elements and
      update on made changes*/
      <div>
         {courses.map(course => <Course key={course.id} course={course}/>)}
      </div>
  )
}


export default App