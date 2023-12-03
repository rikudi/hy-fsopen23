const Person = ({name, number, onDelete}) => {
    return(
        <div>
            <p>{name} {number} <button onClick={onDelete}>Delete</button></p>
        </div>
    )
  }

const Numbers = ({persons, onDelete}) => {
    return(
        <div>
            {persons.map(person => 
                (
                    <Person 
                        key={person.id} 
                        name={person.name} 
                        number={person.number}
                        onDelete={() => onDelete(person.id)}
                    />
                ))}
        </div>
    )
}

export default Numbers