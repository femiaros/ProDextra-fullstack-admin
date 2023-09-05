import { useEffect } from "react"

const useModeChecker = (mode) => {
    
    useEffect(()=>{
        if(mode === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }

    },[mode])

  
}

export default useModeChecker