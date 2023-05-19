import React from "react";

const Statistics = ({counts}) => 
{
    const totalCount = Object.values(counts).reduce((total, count) => total + count, 0)
    return(
        <div>
            <h1>Statistics</h1>
            <p>good: {counts.good}</p>
            <p>neutral: {counts.neutral}</p>
            <p>bad: {counts.bad}</p>
            <p>total: {totalCount}</p>
        </div>
    )
}
export default Statistics;