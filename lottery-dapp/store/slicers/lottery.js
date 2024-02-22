import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    remainingTicket: null
};

export const lotterySlice = createSlice({
    name: "lottery",
    initialState,
    reducers: {
        setRemainingTicket: (state, action) => {
            state.remainingTicket = action.payload;
        }
    }
});

export const { setRemainingTicket } = lotterySlice.actions;

export default lotterySlice.reducer;