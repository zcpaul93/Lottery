import { configureStore } from "@reduxjs/toolkit";
import contractsSlice from "./slicers/contracts"; 
import dataSlice from "./slicers/data";
import lotterySlice from "./slicers/lottery"

const store = configureStore({
    reducer: {
      contracts: contractsSlice,
      data: dataSlice,
      lottery: lotterySlice
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
          serializableCheck: false
      });
    }
})

export default store;