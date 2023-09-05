import {useState} from 'react'
import {CgMenuLeftAlt} from 'react-icons/cg'
import ProfileImage from './ProfileImage'
import {FaRegBell} from 'react-icons/fa'
import {RiSearch2Line} from 'react-icons/ri'
import {HiChevronDown} from 'react-icons/hi' 


const AppHeader = ({setMenu}) => {
  //***required states***
  const [searchToggle, setSearchToggle] = useState(false)
  const [signoutToggle, setSignoutToggle] = useState(false)
  const [search, setSearch] = useState('')


  return (
    <div className=' flex flex-wrap items-center justify-between pt-3 pb-5'>
      {/* Menu Toggle Icon */}
      <span className='border-[1px] xs:border-none border-solid border-bgActiveNav dark:border-bgDarkActiveNav bpi:hidden order-1 text-3xl cursor-pointer Transition hover:opacity-[.6] rounded-md'
        tabIndex='0' 
        aria-label='menu Toggle'
        onClick={() => {
          setMenu(prev=> !prev)
        }}
      >
        <CgMenuLeftAlt/>
      </span>

      {/* Profile Welcome */}
      <div className='mt-8 bpiii:mt-0 py-4 px-3 bpiii:p-0 basis-[100%] order-3 bpiii:order-2 bpiii:basis-[46%] flex gap-4 items-center bg-bgSecondary bpiii:bg-transparent dark:bg-bgDarkSecondary dark:bpiii:bg-transparent shadow-card bpiii:shadow-none dark:shadow-cardDark dark:bpiii:shadow-none rounded-2xl'
        tabIndex='0' 
        aria-label='Hello Nick'
      >
        <ProfileImage/>
        <div className='flex-1'>
          <h1 className='text-xl leading-none font-semibold tracking-wide'>Hello Nick</h1>
          <small>Welcome to your Dextra Dashboard</small>
        </div>
      </div>

      {/* Profile Icons */}
      <div className=' order-2 bpiii:order-3 basis-[46%] flex gap-4'>
        {/* Notification */}
        <span
          tabIndex='0' 
          aria-label='notification'
          className={`Transition relative bg-bgSecondary dark:bg-bgDarkSecondary h-8 rounded-2xl text-lg cursor-pointer flex items-center justify-center overflow-hidden border-solid border-[1px] border-bgActiveNav dark:border-bgDarkActiveNav ${searchToggle? 'w-0 xs:w-8': 'w-8'}`}>
          <FaRegBell/>
          <span className=' absolute w-2 h-2 bg-primary dark:bg-primaryDark top-[6px] right-[7px] rounded-md'></span>
        </span>
        {/* Search */}
        <form className={`Transition ${!searchToggle?' w-8':'w-[162px] xs:w-[191px]'} h-8 rounded-full flex relative overflow-hidden border-solid border-[1px] border-bgActiveNav dark:border-bgDarkActiveNav`}>
          <button 
            type='button'
            className='h-full outline w-8 text-lg bg-bgSecondary dark:bg-bgDarkSecondary flex items-center justify-center'
            onClick={() => {
              setSearchToggle(prev=> !prev)
            }}
          >
            <RiSearch2Line/>
          </button>
          <label className='absolute top-[-500px]' htmlFor="search">Search</label>
          <input 
            id="search"
            className={`h-full bg-transparent px-1 text-xs focus:outline-none Transition transform ${!searchToggle? 'absolute -translate-x-[250px] pointer-events-none' : 'translate-x-0 w-[130px] xs:w-[157px]'}`}
            type="text" 
            placeholder="Anything"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
        {/* LogOut */}
        <div className={`${!signoutToggle?'overflow-hidden rounded-2xl border-[1px]':'rounded-tr-2xl rounded-tl-2xl border-t-[1px] border-l-[1px] border-r-[1px]'} Transition relative ml-auto w-24 xs:w-32 bg-bgSecondary dark:bg-bgDarkSecondary border-solid border-bgActiveNav dark:border-bgDarkActiveNav`}
          tabIndex='0' 
          aria-label='logout toggle'
        >
          <div className='flex h-8 gap-1 items-center px-2'
            onClick={() => {
              setSignoutToggle(prev=> !prev)
            }}
          >
            <ProfileImage size={'mini'}/>
            <small className=' text-xs'>Nick</small>
            <HiChevronDown className={`${!signoutToggle?'rotate-0':'-rotate-90'} Transition ml-auto text-lg transform`} />
          </div>
          <div className={`${!signoutToggle?' h-0 pointer-events-none overflow-hidden':'h-10 overflow-visible border-b-[1px] border-l-[1px] border-r-[1px]'} Transition absolute top-full -left-[1px] w-24 xs:w-32 flex bg-bgSecondary dark:bg-bgDarkSecondary rounded-br-2xl rounded-bl-2xl border-solid border-bgActiveNav dark:border-bgDarkActiveNav`}>
            <button
              type='button'
              className=' m-auto py-1 px-5 text-xs bg-bgActiveNav dark:bg-bgDarkActiveNav rounded-xl'
            >
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppHeader