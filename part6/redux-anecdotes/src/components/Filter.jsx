import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
    const filter = useSelector(state => state.filter)
    //with dispatch, the filter state is updated the in redux store
    const dispatch = useDispatch()
        const handleChange = (event) => {
            const newFilterValue = event.target.value
            dispatch(setFilter(newFilterValue))
        }

        const style = {
            marginBottom: 10
        }

        return (
            <div style={style} >
                Filter <input onChange={handleChange} value={filter} />
            </div>
        )
}

export default Filter