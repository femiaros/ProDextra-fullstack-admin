import {TbError404Off} from 'react-icons/tb'

const Missing = () => {
  return (
    <div className='pt-[100px] min-h-[400px] h-[100vh] flex flex-col items-center gap-4'>
        <div className=' w-20 h-20 text-6xl text-statRed bg-primary dark:bg-primaryDark rounded-full flex'>
            <TbError404Off className='m-auto'/>
        </div>
        <div>
            <h1 className='mb-3 text-center text-6xl font-bold'>Sorry!</h1>
            <p className=' max-w-[400px] tracking-wide'> 
                The resource you have requested does not exist.
            </p>
        </div>
    </div>
  )
}

export default Missing