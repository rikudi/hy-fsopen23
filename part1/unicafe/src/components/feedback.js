import React, {useState} from "react"
import Statistics from "./stats";

const Feedback = () =>
{
    const [counts, setCounts] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
        total: 0,
        average: 0,
        positive: 0
    });

    const handleClick = (button) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [button]: prevCounts[button] + 1
        }))
    }

    return(
        <>
            <div>
                <h1>Give feedback</h1>
                <button onClick={() => handleClick('good')}>good</button>
                <button onClick={() => handleClick('neutral')}>neutral</button>
                <button onClick={() => handleClick('bad')}>bad</button>
            </div>
            <Statistics counts={counts}/>
        </>
    )   
}
export default Feedback;