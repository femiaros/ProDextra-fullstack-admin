const beforeStyle = 'before:content-["$"] before:absolute before:text-[11px] before:font-medium before:left-1/2 before:top-1/2 before:transform before:translate-x-[-50%] before:-translate-y-[37%]'

const StatBox = ({stat,before,format,total}) => {
  return (
    <div className='Transition h-[110px] basis-[100%] xs:basis-[50%] bpiiii:basis-auto flex gap-8 xs:gap-2 items-center cursor-pointer transform hover:scale-[1.02]'>   
        {/* --- 1ST COL --- */}
        <span className={`relative bg-primary dark:bg-primaryDark w-[52px] h-[52px] flex dark:text-primary text-primaryDark text-3xl rounded-full ${before&&beforeStyle}`}>
            <stat.icon className=' m-auto'/>
        </span>
        {/* --- 2ND COL --- */}
        <span className=' text-primaryDark'>
            <small className=''>{stat.title}</small>
            <p className='flex items-center gap-2 leading-6 xs:leading-auto text-[16px] xs:text-[14px]'>
                <>
                {
                   format ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:0}).format(total) 
                    : total
                }
                </>
                <span className=' bg-primary dark:bg-primaryDark dark:text-primary font-bold text-[9px] px-[5px] py-[3px] leading-3 rounded-lg'>{stat.currentIncrement}</span>
            </p>
            <small className='text-[11px] xs:text-[10px]'>{stat.subTitle} <b className=" tracking-wide font-semibold">{stat.previousIncrement}</b></small>
        </span>
    </div>
  )
}

export default StatBox