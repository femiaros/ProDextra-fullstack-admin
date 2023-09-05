import { useSelector } from "react-redux"
import { getMode } from "../app/api/globalSlice"
import PulseLoader from 'react-spinners/BeatLoader'

const AppLoadScreen = () => {
    // *** Required-states && Setups ***
    const mode = useSelector(getMode)
    const defaultColor = mode==='dark' ?'white':'black'

  return (
    <div className=' min-h-[400px] h-[calc(100vh-190px)] flex justify-center items-center'>
        <PulseLoader
            className="Transition transform -translate-y-[300%]"
            color={defaultColor}
            size={35}
            aria-label="Loading Spinner"
            data-testid="Screen Loader"
        />
    </div>
  )
}

export default AppLoadScreen