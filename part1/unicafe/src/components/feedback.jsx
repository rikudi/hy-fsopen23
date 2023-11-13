import {useState} from "react";
import Statistics from "./stats";

//header component
const Header = () => 
{
    return (
     <h1>Give Feedback</h1>
    )
}

//button component
const Button = (props) => {
    return(
        <button onClick={props.handleClick}> {props.name} </button>
    )
}

/*This is the feedback component which is constructed from other child components. 
/ This is the main component with all the functionality and is exported
/ to the root component 'App.jsx', which is then rendered on screen. */
const Feedback = () => 
{
    /*Using useState hook, I declare state variable named 'counts',
    which is an object containing all the key-value pairs.*/
    const [counts, setCounts] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0
    });

//Method that updates the counts state and increments the clicked button value by 1 
    const clickHandler = (button) => {

        setCounts((prevCounts) => ({
            ...prevCounts,
            [button]: prevCounts[button] + 1,
            total: prevCounts.total + 1,

        })) 
    }
    //a div element is returned, consisting of all the built components
    return (
        <div>
            <Header />
            <Button name="good" handleClick={() => clickHandler('good')}/>
            <Button name="neutral" handleClick={() => clickHandler('neutral')}/>
            <Button name="bad" handleClick={() => clickHandler('bad')}/>
            <Statistics counts={counts}/>
        </div>
    )
    
}

export default Feedback