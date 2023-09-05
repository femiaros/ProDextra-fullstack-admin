import { useState,useEffect } from "react"
import { Blurhash } from "react-blurhash"

const ImageHolder = ({src,hashString,altString}) => {
    // *** required state ***
    const [imageLoaded,setImageLoaded] = useState(false)

    useEffect(()=>{
      const img = new Image()
      img.onload = ()=>{
        setImageLoaded(true)
      }
      img.src = src
    },[src])

  return (
    <>
      <div style={{display: imageLoaded? 'none': 'inline'}}>
        <Blurhash 
          hash={hashString}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img
        src={src}
        alt={altString}
        style={{display: !imageLoaded? 'none': 'inline'}}
        className='w-full h-full object-cover'
      />

     
    </>
  )
}

export default ImageHolder