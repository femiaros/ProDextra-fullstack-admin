import { Link } from "react-router-dom"
import {GiCrossedSabres} from 'react-icons/gi'
import {IoMdCloseCircle} from 'react-icons/io'
import { navLinks,navBottomLinks,darkLightLinks } from '../contents'
import { useSelector,useDispatch } from "react-redux"
import { getActiveMenuLink,getMode,setMode } from '../app/api/globalSlice'

const AppNav = ({menu,setMenu}) => {
  // *** Required states ***
  const dispatch = useDispatch()
  const activeMenuLink = useSelector(getActiveMenuLink) 
  const mode = useSelector(getMode)

  return (
  <>
  {/* --- Very Large Screens --- */}
    <div className= {`AppNav z-10 Transition w-60 h-[calc(100vh-40px)] fixed rounded-xl shadow-card dark:shadow-cardDark hidden bpi:block overflow-y-auto`}
      tabIndex='0' 
      aria-label='main navigation bar'
    >
      {/* --- OverLay --- */}
      <div className='bg-bgSecondary dark:bg-bgDarkSecondary w-full min-h-[550px] h-full flex flex-col py-6 px-4 rounded-xl overflow-auto'>
        {/* --- Logo --- */}
        <Link
          to='/dashboard'
          className='flex items-center w-fit mb-5 px-3 text-2xl font-semibold tracking-wide '
          onClick={() => {
            window.scrollTo(0, 0)
          }}
        >
          ProDe<GiCrossedSabres/>tra
        </Link>
        {/* --- NavLinks --- */}
        <ul className=' list-none flex flex-col gap-3 '>
          {
            navLinks.map(link=>(
              <li
                key={link.id}
                onClick={() => {
                  window.scrollTo(0, 0)
                }}
              >
                <Link 
                  to={`/${link.id}`}
                  className={`Transition ${activeMenuLink === link.id ? "bg-bgActiveNav dark:bg-bgDarkActiveNav text-primaryDark" : ""} hover:bg-bgActiveNav dark:hover:bg-bgDarkActiveNav py-2 px-3 flex items-center gap-2 rounded-lg`}
                >
                  <span className='text-lg'><link.icon/></span>
                  {link.title}
                </Link>
              </li>
            ))
          }      
        </ul>
        {/* --- NavBottomLinks --- */}
        <div className=' flex flex-col gap-3 mt-auto'>
          {
            navBottomLinks.map(link=>(
              <span key={link.id} className='py-2 px-3 flex items-center gap-2 rounded-lg cursor-pointer Transition border-2 border-transparent hover:border-solid hover:border-2 hover:border-bgActiveNav hover:dark:border-bgDarkActiveNav'>
                <span className='text-lg'><link.icon/></span>
                <>{link.title}</>
              </span>
            ))
          }
        </div>
        {/* --- Light&Dark Btns  --- */}
        <div className=' mt-5 flex justify-between'>
          {
            <>

            <span
              tabIndex='0' 
              aria-label='light mode'
              onClick={() => {
                dispatch(setMode('light'))
              }}
              className={`${mode==='light' && 'bg-primary text-primaryDark'} w-[100px] text-xs text-center py-2 rounded-md border-solid border-[1px] border-bgActiveNav dark:border-bgDarkActiveNav cursor-pointer`}>
              {darkLightLinks[0].title}
            </span>

            <span
              tabIndex='0' 
              aria-label='dark mode'
              onClick={() => {
                dispatch(setMode('dark'))
              }}
              className={`${mode==='dark' && 'bg-white text-bgDarkPrimary'}  w-[100px] text-xs text-center py-2 rounded-md border-solid border-[1px] border-bgActiveNav dark:border-bgDarkActiveNav cursor-pointer`}>
              {darkLightLinks[1].title}
            </span>

            </>
          }
        </div> 

      </div>
    </div>

  {/* --- Medium & Small Screens --- */}
    <div className= {`AppNav ${menu? 'translate-x-[0]': 'translate-x-[-500px]'} z-10 Transition transform dark:bg-bgDarkPrimary w-64 h-full fixed top-0 rounded-tr-xl rounded-br-xl shadow-card dark:shadow-cardDark bpi:hidden overflow-y-auto`}
      tabIndex='0' 
      aria-label='main navigation bar'
    >
    
      {/* --- OverLay --- */}
      <div className='relative bg-bgSecondary dark:bg-bgDarkSecondary w-full min-h-[550px] h-full flex flex-col pt-6 pb-16 px-4 rounded-xl'>
        {/* --- Close Menu --- */}
        <span className='absolute right-2 text-3xl'
          onClick={() => {
            setMenu(false)
          }}
        >
          <IoMdCloseCircle/>
        </span>
        {/* --- Logo --- */}
        <Link
          to='/dashboard'
          className='flex items-center w-fit mb-5 px-3 text-2xl font-semibold tracking-wide '
          onClick={() => {
            window.scrollTo(0, 0)
          }}
        >
          ProDe<GiCrossedSabres/>tra
        </Link>
        {/* --- NavLinks --- */}
        <ul className=' list-none flex flex-col gap-3 '>
          {
            navLinks.map(link=>(
              <li
                key={link.id}
                onClick={() => {
                  setMenu(false)
                  window.scrollTo(0, 0)
                }}
              >
                <Link 
                  to={`/${link.id}`}
                  className={`Transition ${activeMenuLink === link.id ? "bg-bgActiveNav dark:bg-bgDarkActiveNav text-primaryDark" : ""} hover:text-primaryDark  hover:bg-bgActiveNav dark:hover:bg-bgDarkActiveNav py-2 px-3 flex items-center gap-2 rounded-lg`}
                >
                  <span className='text-lg'><link.icon/></span>
                  {link.title}
                </Link>
              </li>
            ))
          }      
        </ul>
        {/* --- NavBottomLinks --- */}
        <div className=' flex flex-col gap-3 mt-auto'>
          {
            navBottomLinks.map(link=>(
              <span 
                key={link.id} 
                onClick={() => {
                  setMenu(false)
                  window.scrollTo(0, 0)
                }}
                className='py-2 px-3 flex items-center gap-2 rounded-lg cursor-pointer Transition border-2 border-transparent hover:border-solid hover:border-2 hover:border-bgActiveNav hover:dark:border-bgDarkActiveNav'>
                <span className='text-lg'><link.icon/></span>
                <>{link.title}</>
              </span>
            ))
          }
        </div>
        {/* --- Light&Dark Btns  --- */}
        <div className=' mt-5 flex justify-between'>
          {
            <>

            <span
              onClick={() => {
                dispatch(setMode('light'))
                setMenu(false)
                window.scrollTo(0, 0)
              }}
              className={`${mode==='light' && 'bg-primary text-primaryDark'} w-[100px] text-xs text-center py-2 rounded-md border-solid border-[1px] border-bgActiveNav dark:border-bgDarkActiveNav cursor-pointer`}>
              {darkLightLinks[0].title}
            </span>

            <span
              onClick={() => {
                dispatch(setMode('dark'))
                setMenu(false)
                window.scrollTo(0, 0)
              }}
              className={`${mode==='dark' && 'bg-white text-bgDarkPrimary'}  w-[100px] text-xs text-center py-2 rounded-md border-solid border-[1px] border-bgActiveNav dark:border-bgDarkActiveNav cursor-pointer`}>
              {darkLightLinks[1].title}
            </span>

            </>
          }
        </div> 

      </div>

    </div>
  </>
  )
}

export default AppNav
