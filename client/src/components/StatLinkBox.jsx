import { useDispatch } from "react-redux"
import { setCustomersListLink } from "../app/api/globalSlice"
import { memberThumbs } from "../contents"

const StatLinkBox = ({stat,total,active}) => {
    const dispatch = useDispatch()

  return (
    <div className='Transition w-full xs:w-[200px] h-[110px] flex gap-6 bpiiii:gap-2 items-center cursor-pointer transform hover:scale-[1.02]'
        onClick={() => {
            dispatch(setCustomersListLink(stat.link))
        }}
    >
        {/* --- 1ST COL --- */}
        <span className={`relative bg-primary dark:bg-primaryDark w-14 h-14 flex dark:text-primary text-primaryDark text-3xl rounded-full overflow-hidden`}>
            <stat.icon className=' m-auto'/>
        </span>
        {/* --- 2ND COL --- */}
        <span className=' '>
            <small className='tracking-wide'>{stat.title}</small>
            <p className=' text-xl font-semibold'>
                {total}
            </p>

            {
                active ? (
                    <p className="flex">
                        {
                            memberThumbs.map((address,i)=>(
                                i===0 ? <span key={i} className="bg-altOne w-[19px] h-[19px] flex rounded-xl">
                                            <img className=" w-[75%] m-auto object-cover rounded-xl" src={address} alt={`thumb${i+1}`}/>
                                        </span>
                                :i===1 ?<span key={i} className="bg-bgStatGreen ml-[-3px] w-[19px] h-[19px] flex rounded-xl">
                                            <img className=" w-[75%] m-auto object-cover rounded-xl" src={address} alt={`thumb${i+1}`}/>
                                        </span>
                                :i===2 ?<span key={i} className="bg-statRed ml-[-3px] w-[19px] h-[19px] flex rounded-xl">
                                            <img className=" w-[75%] m-auto object-cover rounded-xl" src={address} alt={`thumb${i+1}`}/>
                                        </span>
                                :i===3 ?<span key={i} className="bg-statGreen ml-[-3px] w-[19px] h-[19px] flex rounded-xl">
                                            <img className=" w-[75%] m-auto object-cover rounded-xl" src={address} alt={`thumb${i+1}`}/>
                                        </span>
                                :<span key={i} className="bg-bgStatRed ml-[-3px] w-[19px] h-[19px] flex rounded-xl">
                                    <img className=" w-[75%] m-auto object-cover rounded-xl" src={address} alt={`thumb${i+1}`}/>
                                </span>

                            ))
                        }
                    </p>
                ):(
                    <small className='text-[10px] tracking-wide font-semibold flex gap-1'>
                        <span className={`${stat.subIconColor==='green' ?'text-statGreen dark:text-bgStatGreen':'text-statRed dark:text-bgStatRed'} flex`} >
                            <stat.subSymbol className=' text-xl'/>
                            <>{` ${stat.increment}`}</>
                        </span>
                        <b className="font-semibold">{`${stat.subTitle}`}</b>
                    </small>
                )
            }
            
        </span>
    </div>
  )
}

export default StatLinkBox