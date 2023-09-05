import { useState,useEffect } from "react"
import { useGetDashboardQuery } from './dashboardApiSlice' 
import useTitle from "../../hooks/useTitle"
import usePageChecker from '../../hooks/usePageChecker'
import StatBox from '../../components/StatBox'
import { MenuItem,Select,Box,useMediaQuery } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'
import AppLoadScreen from "../../components/AppLoadScreen"
import AppErrorScreen from "../../components/AppErrorScreen"
import ResponsiveBarChart from "../../components/ResponsiveBarChart"
import ResponsivePieChart from "../../components/ResponsivePieChart"
import ResponsiveLineChart from "../../components/ResponsiveLineChart"
import ImageHolder from "../../components/ImageHolder"
import { statBoxData } from "../../contents"


const Dashboard = () => {
  // *** Required-states && Setups ***
  useTitle('Dashboard - ProDextra')
  usePageChecker('dashboard')
  const isNonMediumScreens = useMediaQuery("(min-width: 860px)")
  const isSmallScreens = useMediaQuery("(max-width: 500px)")

  const [month, setMonth] = useState("Dec")
  const [monthData, setMonthData] = useState({})
  const [pageSize, setPageSize] = useState(4)

  const {
    data: dashboard,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetDashboardQuery('dashboard', {refetchOnFocus: false,})

  {/* ---SetMonthData BarChart if New Month is Selected--- */}
  useEffect(()=>{
    if(isSuccess){
      const currentMonthData = dashboard.monthlySalesData.find(item=> item.month === month)
      setMonthData(currentMonthData)
      // console.log(dashboard)
    }
  },[isSuccess,month])

  let columns = [
    {
      field: 'coverImage',
      headerName: 'Product name',
      flex: 1,
      renderCell: (params) => { 
        return (
          <span className="h-[80%] w-[70%] rounded-lg overflow-hidden">
            <ImageHolder 
              src={params.row.coverImage} 
              hashString={"LGF5?xYk^6#M@-5c,1J5@[or[Q6."}
              altString={"coverImage" }
            />
          </span>
        ) 
      },
      sortable: false,
      filterable: false,
    },
    {
      field: "name",
      headerName: "",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <h5 className="text-xs">{params.row.name}</h5>
            <small className="text-[9px]">
              {params.row.category}
            </small>
          </div>
        ) 
      },
    },
    {
      field: "variants",
      headerName: "Variants",
      flex: 0.5
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.56,
      editable: true,
      renderCell: (params) => `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:0}).format(params.row.price)}`
    },
    {
      field: "totalUnitSold",
      headerName: "Total Sales",
      flex: 0.5,
    }
  ]

  {/* --- Remove Column On Small Screen--- */}
  if(isSmallScreens){
    columns = columns.filter(({field})=> field!=='variants').map(item=>{
      if(item.field === 'coverImage'){
        return{
          ...item,
          renderCell: (params) => { 
            return (
              <img  
                className="h-[80%] w-[90%] object-cover rounded-lg overflow-hidden"
                src={params.row.coverImage} 
                alt="coverImage" 
              />
            ) 
          }
        }
      }
      if(item.field === 'totalUnitSold') return {...item,headerName:"Sales"}
      return item
    })
  }

  let content

  {/* ---While Screen Loads--- */}
  if (isLoading) content = <AppLoadScreen/>

  {/* ---Display Error--- */}
  if (isError) content = <AppErrorScreen error={error}/>

  {/* ---Success--- */}
  if (isSuccess) {
  
    content = (
      <div className='pb-20 min-h-[calc(100vh-100px)] grid gap-6 bpii:gap-5 grid-cols-6 grid-flow-row auto-rows-[110px]'>
        {/* Stat Boxs */}
        <div className=' col-span-full row-span-3 xs:row-span-2 bpiiii:row-span-1 bpii:col-span-4 bg-altTwo flex flex-wrap justify-between px-6 xs:px-4 rounded-2xl shadow-card dark:shadow-cardDark'>
          {
            statBoxData.map((stat,i)=>(
              i===0 ? <StatBox key={stat.id} stat={stat} before={true} format={true} total={dashboard.monthRevenueTotal}/>
                : i===1 ? <StatBox key={stat.id} stat={stat} format={true} total={dashboard.monthSalesTotal}/>
                  : <StatBox key={stat.id} stat={stat} total={dashboard.monthProductsTotal}/>
            ))
          }
        </div>
        {/* Customers Categories Pie Chart */}
        <div className='p-4 col-span-full row-span-3 bpii:col-start-5 bpii:col-end-7 bpii:row-start-1 bpii:row-end-4 bg-bgSecondary dark:bg-bgDarkSecondary flex flex-col gap-1 rounded-2xl shadow-card dark:shadow-cardDark'>
          <div>
            <h2 className=' font-semibold'>Customers</h2>
            <small className='text-[10px]'>Customers that buy products</small>
          </div>
          <div className='relative flex-1'>
            <ResponsivePieChart data={dashboard.customerStats.categories} dash={true}/>
            <div className='absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-20 flex flex-col items-center'>
              <p className='leading-4 text-lg font-medium'>{`${dashboard.customerStats.categories[0].value}%`}</p>
              <small className='text-[10px] text-center leading-4'>Customers With Membership</small>
            </div>
          </div>
        </div>
        {/* Year Sales Summary */}
        <div className='p-4 col-span-full row-span-4 bpii:col-start-1 bpii:col-end-5 bpii:row-start-2 bpii:row-end-4 bg-bgSecondary dark:bg-bgDarkSecondary flex flex-col bpii:flex-row bpii:gap-0 justify-between bpii:justify-stretch rounded-2xl shadow-card dark:shadow-cardDark'>
          <div className=' bpii:basis-[45%] bpii:h-full flex flex-row bpii:flex-col gap-10'>
            <div>
              <h2 className=' font-semibold'>Total Sales & Cost</h2>
              <small className='text-[10px]'>Year - 2023</small>
            </div>
            <div>
              <p className=' text-xl font-semibold tracking-wide flex gap-1 items-center'>
                {`${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:0}).format(dashboard.yearSalesTotal)}k`} 
                <span className='tracking-wide bg-bgStatGreen text-statGreen font-semibold text-[9px] px-[7px] py-[2px] leading-3 border-solid border-[1px] border-statGreen rounded-lg'>+25%</span>
              </p>
              <small className='text-[10px]'>{`${dashboard.yearProductsTotal} total-units sold`}</small>
            </div>
          </div>

          <div className='h-[calc(100%-140px)] bpii:basis-[55%] bpii:h-full'>
            <div className='flex items-center justify-between'>
              <p className=' text-[13px]'>Analytics <span className='tracking-wide dark:text-bgStatGreen text-statGreen font-semibold'>+5.4%</span></p>
                
              <Select
                sx={{fontSize:13,height:30,width:75}}
                value={month}
                label="Month"
                onChange={(e) =>setMonth(e.target.value)}
              >
                {/* 1st four-months has no Sales */}
                <MenuItem sx={{fontSize:13}} value="May">May</MenuItem>
                <MenuItem sx={{fontSize:13}} value="Jun">Jun</MenuItem>
                <MenuItem sx={{fontSize:13}} value="Jul">Jul</MenuItem>
                <MenuItem sx={{fontSize:13}} value="Aug">Aug</MenuItem>
                <MenuItem sx={{fontSize:13}} value="Sept">Sept</MenuItem>
                <MenuItem sx={{fontSize:13}} value="Nov">Nov</MenuItem>
                <MenuItem sx={{fontSize:13}} value="Dec">Dec</MenuItem>
              </Select>  
            </div>
            <ResponsiveBarChart data={monthData.data} dash={true}/>
          </div>
        </div>
        {/* Recent Products Sold List */}
        <div className="p-3 pb-0 col-span-full row-span-4 bpii:col-start-1 bpii:col-end-5 bpii:row-start-4 bpii:row-end-7 flex flex-col bg-bgSecondary dark:bg-bgDarkSecondary shadow-card dark:shadow-cardDark rounded-2xl">
          <div className="flex items-center justify-between">
            <h2 className=' font-semibold'>Products Sold</h2>
            <small className="text-[10px] text-primaryDark tracking-wide bg-bgActiveNav dark:bg-bgDarkActiveNav px-[20px] py-[2px] rounded-xl">Last 30 days</small>
          </div>
          <Box
            className=' flex-1'
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                fontSize:12
              },
              "& .MuiDataGrid-columnHeaders": {
                fontSize:11,
                border: "none",
              },
              "& .MuiTablePagination-displayedRows": {
                fontSize:12,
              }
            }}
          >
            <DataGrid
              loading={isLoading || !dashboard}
              getRowId={(row) => row._id}
              rows={(dashboard && dashboard.monthSoldProducts) || []}
              columns={columns}
              rowsPerPageOptions={isNonMediumScreens? [4]:[7]}
              pageSize={isNonMediumScreens? pageSize:7}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}   
            />
          </Box>

        </div>
        {/* Customers Activity Line Chart */}
        <div className='p-4 col-span-full row-span-3 bpii:col-start-5 bpii:col-end-7 bpii:row-start-4 bpii:row-end-7 bg-bgSecondary dark:bg-bgDarkSecondary flex flex-col gap-1 rounded-2xl shadow-card dark:shadow-cardDark'>
          <h2 className=' font-semibold'>Customers Activity</h2>
          <div className="relative flex-1 before:content-[''] before:absolute before:w-[2px] before:h-[84%] dark:before:bg-white before:bg-black before:left-[55%] before:top-1/2 before:transform before:translate-x-[100%] xs:before:translate-x-[-500%] bpii:before:translate-x-[200%] before:-translate-y-[53%]">
      
            <ResponsiveLineChart data={dashboard.customerStats.activities} dash={true}/>
          
          </div>

        </div>
        
      </div>
    )
  }

  return content
}

export default Dashboard