import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userId: "63701cc1f03239b7f700000e",
  mode: "dark",
  menu: true,
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
    toggleMenu: (state) => {
      state.menu =  !state.menu
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
export const getMenu = (state) => state.global.menu
export const getActiveMenuLink = (state) => state.global.activeMenuLink
export const getCustomersListLink = (state) => state.global.customersListLink

export const { setMode,toggleMenu,setActiveMenuLink,setCustomersListLink } = globalSlice.actions

export default globalSlice.reducer