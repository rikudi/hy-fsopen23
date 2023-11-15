//component for a single stat line. Defined as HTML table row.
const StatisticsLine = (props) => {
    return (
        <tr>
            <td>{props.text}: {props.value}</td>
        </tr>
        
    )
}

const Statistics = ({counts}) => 
{
    /*Iterating through the 'counts' object (used as parameter)
    and summing all the objects' key values to a constant totalCount*/
    const average = ((counts.good - counts.bad) / counts.total || 0)
    const positive = (counts.good / counts.total * 100 || 0)

    if(counts.total === 0) 
    {
        return (
            <div>
                <h1>Statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
    return(
        <div>
            <h1>Statistics</h1>
            <table>
                <tbody>
                        <StatisticsLine text={'Good'} value={counts.good} />
                        <StatisticsLine text={'Neutral'} value={counts.neutral} />
                        <StatisticsLine text={'Bad'} value={counts.bad} />
                        <StatisticsLine text={'Total'} value={counts.total} />
                        <StatisticsLine text={'Positive'} value={positive + '%'} />
                        <StatisticsLine text={'Average'} value={average} />
                </tbody>
            </table>
            

            
            
            
            
        </div>
    )
}
export default Statistics