
const StatAnalyticsBox = ({stat,format,num}) => {
  return (
    <div className='Transition relative mb-[18px] w-full xs:w-[200px] flex flex-col items-start cursor-pointer transform hover:scale-[1.02] before:content-[""] before:absolute before:h-[2px] before:w-[90%] before:bg-primary dark:before:bg-primaryDark before:left-0 before:top-[100%]'>
        <span className={`relative bg-primary dark:bg-primaryDark h-10 w-10 flex dark:text-primary text-primaryDark text-2xl rounded-full mb-2`}>
            <stat.icon className=' m-auto'/>
        </span>

        <small>{stat.title}</small>

        {   format ? (
            <p className=" text-2xl font-semibold mt-1">
                {
                    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:0}).format(Math.round(num))
                }
                <span className=" text-sm font-medium">
                    {
                        `.${num.toFixed(2).toString().split('.')[1]}`
                    }
                </span>
            </p>
            ):(
                <p className=" text-2xl font-semibold mt-1">{num}</p>
            )
        }

        <small className='text-[10px] font-semibold flex gap-1 mb-1'>
            <span className={`${stat.subIconColor==='green' ?'text-statGreen dark:text-bgStatGreen':'text-statRed dark:text-bgStatRed'} flex items-center gap-[2px] tracking-wide`} >
                <stat.subSymbol className=' text-[15px]'/>
                <>{` ${stat.increment}`}</>
            </span>
            <b className=" font-medium">{`${stat.subTitle}`}</b>
        </small>

    </div>
  )
}

export default StatAnalyticsBox