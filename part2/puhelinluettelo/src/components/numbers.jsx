const Person = (props) => {
    return(
      <p>{props.name} {props.number}</p>
    )
  }

const Numbers = ({persons}) => {
    return(
        <div>
            {persons.map(person => 
                (
                    <Person key={person.id} name={person.name} number={person.number}/>
                ))}
        </div>
    )
}

export default Numbers