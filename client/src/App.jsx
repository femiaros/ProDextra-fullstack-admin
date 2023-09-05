import { ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import useModeChecker from "./hooks/useModeChecker"
import useTitle from "./hooks/useTitle"
import { getMode } from "./app/api/globalSlice" 
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { themeSettings } from "./theme"
import Dashboard from "./scenes/dashboard"
import Layout from "./components/Layout"
import Management from "./scenes/management"
import Transactions from "./scenes/transactions"
import Analytics from "./scenes/analytics"
import Missing from "./components/Missing"

function App() {
  // *** Required-states && Setups ***
  useTitle('ProDextra')
  const mode = useSelector(getMode)
  useModeChecker(mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className=" bg-bgPrimary dark:bg-gradient-to-r from-bgDarkPrimary via-[#4D5270] to-[#424764] text-sm text-primary dark:text-primaryDark min-h-screen pt-5">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/management" element={<Management />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
            <Route path="*" element={<Missing />} />  {/* catch all */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
