import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addNotifications: (state,{ payload}) => {},
        resetNotifications: (state,{ payload}) => {},
    },

    extraReducers: (builder) => {
        //save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state,{ payload}) => payload);
        //save user after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state,{ payload}) => payload);
         // logout: destory user session
         builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, () => null );
        },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer; 