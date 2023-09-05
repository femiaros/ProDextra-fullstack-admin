import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "dark",
  activeMenuLink: "",
  customersListLink: "customers"
}

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state,action) => {
      state.mode = action.payload 
    },
    setActiveMenuLink: (state, action) => {
      state.activeMenuLink = action.payload
    },
    setCustomersListLink: (state, action) => {
      state.customersListLink = action.payload
    }
  },
})

export const getMode = (state) => state.global.mode
export const getActiveMenuLink = (state) => state.global.activeMenuLink
export const getCustomersListLink = (state) => state.global.customersListLink

export const { setMode,setActiveMenuLink,setCustomersListLink } = globalSlice.actions

export default globalSlice.reducer