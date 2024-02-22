import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lottery: null
};

export const contractSlice = createSlice({
    name: "contracts",
    initialState,
    reducers: {
        setLotteryContract: (state, action) => {
            state.lottery = action.payload;
        },
    }
});

export const { setLotteryContract } = contractSlice.actions;

export default contractSlice.reducer;