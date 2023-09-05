import React from "react"
import ImageHolder from "./ImageHolder"
const imgSrc = 'https://img.icons8.com/?size=512&id=32677&format=png'

let ProfileImage = ({size}) => {

  return (
    <span className={`${size==='mini'? 'w-6 h-6': 'w-14 h-14'} bg-altOne flex rounded-full overflow-hidden`}>

      <span className="w-3/5 m-auto overflow-hidden">
        <ImageHolder 
          src={imgSrc} 
          hashString={"LGF5?xYk^6#M@-5c,1J5@[or[Q6."}
          altString={"profile-img" }
        />
      </span>
      
    </span>
  )
}

ProfileImage = React.memo(ProfileImage)
export default ProfileImage