import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clicked: false
};

export const buttonSlice = createSlice({
    name: 'streamButton',
    initialState,

    reducers: {
        click: (state) => {
            state.clicked = true;
        }
    }
})

export const { click } = buttonSlice.actions;

export const selectButton = (state) => state.streamButton.clicked;


export default buttonSlice.reducer;