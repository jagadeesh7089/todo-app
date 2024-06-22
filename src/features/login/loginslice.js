import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isloggedin:window.localStorage.getItem("user")?true:false,
    user:JSON.parse(window.localStorage.getItem("user"))
}
export const loginSlice=createSlice({
    name:"loginslice",
    initialState,
    reducers:{
        updatelogin:(state,action)=>{
          state.isloggedin=action.payload.status
          state.user=action.payload.user
        }
    }
})
export const {updatelogin}=loginSlice.actions
export default loginSlice.reducer