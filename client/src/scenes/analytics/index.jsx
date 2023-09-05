import useTitle from '../../hooks/useTitle'
import usePageChecker from '../../hooks/usePageChecker'
import AppLoadScreen from "../../components/AppLoadScreen"
import AppErrorScreen from "../../components/AppErrorScreen"
import {CgCalendarTwo} from 'react-icons/cg'
import StatAnalyticsBox from '../../components/StatAnalyticsBox'
import { statAnalyticsBoxData } from '../../contents'
import ResponsiveLineChart from '../../components/ResponsiveLineChart'
import ResponsiveChoroplethChart from '../../components/ResponsiveChoroplethChart'
import ResponsiveBarChart from '../../components/ResponsiveBarChart'
import { useGetAnalyticsQuery } from './analyticsApiSlice'

const Analytics = () => {
    // *** Required-states && Setups ***
    useTitle('Analytics - ProDextra')
    usePageChecker('analytics')
    const {
        data: analytics,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAnalyticsQuery('analytics', {refetchOnFocus: false,})

    let content

    {/* ---While Screen Loads--- */}
    if (isLoading) content = <AppLoadScreen/>

    {/* ---Display Error--- */}
    if (isError) content = <AppErrorScreen error={error}/>

    {/* ---While Screen Loads--- */}
    if (isSuccess) content =(
        <div className='pb-20 min-h-[calc(100vh-100px)]'>
            {/* Upper Row */}
            <div className='py-1 px-4 min-h-[400px] rounded-2xl bg-bgSecondary dark:bg-bgDarkSecondary shadow-card dark:shadow-cardDark'>
                {/* Header */}
                <div className=' py-4 flex items-center justify-between'>
                    <h2 className=' font-semibold'>Sales Estimation</h2>
                    <div className='py-1 px-3 text-xs bg-bgActiveNav dark:bg-bgDarkActiveNav text-primaryDark flex items-center gap-2 rounded-xl'>
                        <CgCalendarTwo className='text-[14px]'/>
                        <span>Last 7 Days</span>
                    </div>
                </div>
                {/* Stat Boxs */}
                <div className='px-2 xs:px-0 flex flex-wrap justify-between pb-1'>
                    {
                        statAnalyticsBoxData.map((stat,i)=>(
                            i===0 ? <StatAnalyticsBox key={stat.id} stat={stat} num={analytics.currentWeekNetSales} format={true}/>
                            :i===1? <StatAnalyticsBox key={stat.id} stat={stat} num={analytics.weekProductViews}/>
                            :i===2? <StatAnalyticsBox key={stat.id} stat={stat} num={analytics.weekSoldProducts.toFixed(2)}/>
                            : <StatAnalyticsBox key={stat.id} stat={stat} num={analytics.weekTransactionCount.toFixed(2)}/>
                        ))
                    }
                </div>
                {/* Current/Previous week Accumulated Sales Line Chart*/}
                <div className='relative h-[260px]'>
                    <ResponsiveLineChart data={analytics.accSalesLine}/>
                    <div className='absolute top-0 right-3 flex gap-3'>
                        <div className='flex items-center gap-1'>
                            <span className=' h-[10px] w-[10px] bg-primary dark:bg-primaryDark rounded-lg'></span>
                            <span className=' text-[10px]'>This Week Sales</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <span className=' h-[10px] w-[10px] bg-altTwo rounded-lg'></span>
                            <span className=' text-[10px]'>Last Week Sales</span>
                        </div>
                    </div>
                </div>
                
            </div>
            
            {/* Lower Row */}
            <div className='mt-6 pt-1 pb-4 px-4 rounded-2xl bg-bgSecondary dark:bg-bgDarkSecondary shadow-card dark:shadow-cardDark'>
                {/* Header */}
                <h2 className='py-4 font-semibold'>Customer's Geolocation</h2>
                {/* Map && Graph */}
                <div className='flex items-center flex-wrap'>
                    <div className='mb-3 bpiii:mb-0 h-[350px] w-[100%] bpiii:w-[50%] pt-1 xs:pl-1 xs:pr-2'>
                        <ResponsiveChoroplethChart data={analytics.customersCountryData}/>
                    </div>
                    <div className=' h-[400px] w-[100%] bpiii:w-[50%]'>
                        <ResponsiveBarChart data={analytics.customersCountryBar}/>
                    </div>
                </div>
            </div>
        </div>
    ) 

    return content
}

export default Analytics