import {useState} from 'react'
import AppNav from "./AppNav"
import AppHeader from "./AppHeader"
import AppFooter from './AppFooter'
import { Outlet } from "react-router-dom"
import { useMediaQuery } from "@mui/material"

const Layout = () => {
  // *** Required states ***
  const [menu, setMenu] = useState(false)
  const isNonMediumScreens = useMediaQuery("(min-width: 1090px)")

  return (
    <div className=' max-w-7xl min-h-screen mx-auto'>

      <AppNav menu={menu} setMenu={setMenu}/>
      <main 
        className= {` bpi:ml-60 Transition px-3 pb-4 bpiii:px-5`}
        onClick={() => {
          // *** On Medium & Small hide AppNav on PageBody Clicked ***
          if(!isNonMediumScreens&&menu) setMenu(false)
        }}
      >
        <AppHeader setMenu={setMenu}/>
        <Outlet />
        <AppFooter/>
      </main>

    </div>
  )
}

export default Layout