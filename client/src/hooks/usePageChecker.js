import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActiveMenuLink } from "../app/api/globalSlice"

const usePageChecker = (page) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setActiveMenuLink(page))
    },[page])
  
}

export default usePageChecker