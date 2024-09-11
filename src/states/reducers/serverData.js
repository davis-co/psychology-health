import { createSlice } from "@reduxjs/toolkit"

export const serverDataSlice = createSlice({
    name: "data",
    initialState: {
        isAuthorized: null,
        selectErrors: [],
    },
    reducers: {
        setIsAuthroized: (state, action) => {
            state.isAuthorized = action.payload
        },
        setSelectErrors: (state, action) => {
            state.selectErrors = action.payload
        },
    },
})

export const { setSelectErrors, setIsAuthroized } = serverDataSlice.actions

export default serverDataSlice.reducer
