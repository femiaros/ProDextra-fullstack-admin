import {RiSignalWifiErrorFill} from 'react-icons/ri'
import {BiSolidErrorAlt} from 'react-icons/bi'

const AppErrorScreen = ({error}) => {
  return (
    <div className='pt-[50px] text-statRed min-h-[400px] h-[calc(100vh-190px)] flex flex-col items-center gap-4'>
        <div className=' w-20 h-20  text-4xl bg-primary dark:bg-primaryDark rounded-full flex'>
            {
                error?.error ? <BiSolidErrorAlt className='m-auto'/>
                : <RiSignalWifiErrorFill className='m-auto'/>
            }
        </div>
        <div>
            <h1 className='mb-1 text-center text-xl'>Ooops!</h1>
            <p className=' max-w-[400px]'> 
                {error?.data?.message || error?.error}
            </p>
        </div>
    </div>
  )
}

export default AppErrorScreen