import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clicked: false,
    group_sid: '',
    token_sid: '',
    token_auth: '',
};

export const buttonSlice = createSlice({
    name: 'streamButton',
    initialState,

    reducers: {
        click: (state) => {
            state.clicked = true;
        },
        update_group: (state, action) => {
            state.group_sid = action.payload.sid;
        },
        get_auth: (state, action) => {
            state.token_sid = action.payload.sid;
            state.token_auth = action.payload.auth;
        },
    }
})

export const { click, update_group, get_auth } = buttonSlice.actions;

export const selectButton = (state) => state.streamButton.clicked;
export const selectGroup = (state) => state.streamButton.group_sid;

export default buttonSlice.reducer;