import { createSlice } from "@reduxjs/toolkit";
const initialState='please enter your message input'

const contentSlice=createSlice({
    name:"content",
    initialState,
    reducers:{
        chnageContent:(state,action)=>{
            state.value=action;
        }
    }

})
export const {chnageContent}=contentSlice.actions
export const selectValue=(state=>state.content.value)
export default contentSlice.reducer