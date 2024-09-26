import { createSlice } from "@reduxjs/toolkit"

export const serverDataSlice = createSlice({
    name: "data",
    initialState: {
        isAuthorized: null,
        selectErrors: [],
        mentalAssesmentTotal:null
    },
    reducers: {
        setIsAuthroized: (state, action) => {
            state.isAuthorized = action.payload
        },
        setSelectErrors: (state, action) => {
            state.selectErrors = action.payload
        },
        setMentalAssesmentTotal:(state,action)=>{
            state.mentalAssesmentTotal=action.payload
        }
    },
})

export const { setSelectErrors, setIsAuthroized,setMentalAssesmentTotal } = serverDataSlice.actions

export default serverDataSlice.reducer
