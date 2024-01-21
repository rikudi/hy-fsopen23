import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    //with dispatch, the filter state is updated the in redux store
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const newFilterValue = event.target.value
        dispatch(filterChange(newFilterValue))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style} >
            Filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter