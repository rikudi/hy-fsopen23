import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter: (state, action) => {
            console.log(state, action)
            return action.payload
        }
    }
})

//export the reducers and actions
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer