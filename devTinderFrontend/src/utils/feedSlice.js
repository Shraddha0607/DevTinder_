import {
    createSlice
} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            const newFeeds = state.filter((user) => user._id !== action.payload);
            return newFeeds;
        },
    },
});

export const {
    addFeed,
    removeUserFromFeed
} = feedSlice.actions;
export default feedSlice.reducer;