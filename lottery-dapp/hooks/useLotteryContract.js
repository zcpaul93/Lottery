import { useSelector } from "react-redux";

export const useLotteryContract = () => {
    const lotteryContract = useSelector((state) => state.contracts.lottery);
    return lotteryContract;
};