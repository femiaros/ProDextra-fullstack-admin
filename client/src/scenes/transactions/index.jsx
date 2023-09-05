import { useMemo, useState } from "react"
import useTitle from "../../hooks/useTitle"
import usePageChecker from '../../hooks/usePageChecker'
import AppLoadScreen from "../../components/AppLoadScreen"
import AppErrorScreen from "../../components/AppErrorScreen"
import { useTheme,Box,useMediaQuery } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'
import DatePicker from "react-datepicker"
import {AiOutlineReload} from 'react-icons/ai'
import "react-datepicker/dist/react-datepicker.css"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu"
import ImageHolder from "../../components/ImageHolder"
import { useGetTransactionsQuery } from './transactionsApiSlice'

const Transactions = () => {
    // *** Required-states && Setups ***
    useTitle('Transactions - ProDextra')
    usePageChecker('transactions')
    const theme = useTheme()
    const isNonMediumScreens = useMediaQuery("(min-width: 800px)")
    const isSmallScreens = useMediaQuery("(max-width: 600px)")

    const [pageSize, setPageSize] = useState(50)
    const [startDate, setStartDate] = useState(new Date("2023-05-01"))
    const [endDate, setEndDate] = useState(new Date("2023-12-31"))

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTransactionsQuery('transactions', {
        refetchOnFocus: false
    })

    {/* ---Track data, startDate, endDate--- */}
    const {transactions} = useMemo(() => {
        if (!data) return []
        let { transactions } = data

        transactions = transactions.filter(({closedAt})=>{
            const dateFormatted = new Date(closedAt)
            return dateFormatted >= startDate && dateFormatted <= endDate
        })

        return {transactions}
    }, [data, startDate, endDate])

    let columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            editable: true
        },
        {
            field: "customerName",
            headerName: "Customer",
            flex: 1,
            sortable: false,
            editable: true,
            renderCell: (params) => {
                return (
                <div className="flex items-center gap-2">
                    <span className="h-[33px] w-[33px] rounded-full overflow-hidden">
                        <ImageHolder 
                            src={params.row.customerImage} 
                            hashString={"LGF5?xYk^6#M@-5c,1J5@[or[Q6."}
                            altString={"customer-thumb" }
                        />
                    </span>
                    <p className="">{params.row.customerName}</p>
                </div>
                ) 
            }
        },
        {
            field: "closedAt",
            headerName: "ClosedAt",
            flex: 0.8,
            renderCell: (params) => `${new Date(params.row.closedAt).toDateString()}`
        },
        {
            field: "productsCount",
            headerName: "Products",
            flex: 0.5,
        },
        {
            field: "cost",
            headerName: "Amount",
            flex: 0.7,
            renderCell: (params) => `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:2}).format(params.row.cost)}`
        }
    ]

    {/* --- Remove Column On Medium Screen--- */}
    if(!isNonMediumScreens){
        columns = columns.filter(({field})=>{
            return field!=='productsCount'
        })
    }
    {/* --- Remove Column On Small Screen--- */}
    if(isSmallScreens){
        columns = columns.filter(({field})=>{
            return field==='_id' || field==='customerName' || field==='closedAt'
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
            <div className='pb-20 min-h-[calc(100vh-100px)]'>
                <div className="px-2 xs:px-4 py-4 pb-2 bg-bgSecondary dark:bg-bgDarkSecondary rounded-2xl shadow-card dark:shadow-cardDark">
                    {/* Header */}
                    <div className="flex flex-col items-stretch gap-3 bpiiii:flex-row bpiiii:gap-0 bpiiii:items-center justify-between mb-2">
                        {/* Title */}
                        <h2 className='pl-1 xs:pl-0 font-semibold'>Transactions</h2>
                        <div className="flex items-center gap-4 text-primaryDark">
                            <section className="flex items-center gap-1">
                                <div className="Transition pl-3 flex items-center h-7 bg-bgActiveNav dark:bg-bgDarkActiveNav rounded-xl cursor-pointer hover:shadow-card dark:hover:shadow-cardDark">
                                    <span className="font-medium">
                                        From
                                    </span>
                                    <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date('2023-01-01')}
                                    />
                                </div>
                                <div className="Transition pl-3 flex items-center h-7 bg-bgActiveNav dark:bg-bgDarkActiveNav rounded-xl cursor-pointer hover:shadow-card dark:hover:shadow-cardDark">
                                    <span className="font-medium">
                                        To
                                    </span>
                                    <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    maxDate={new Date('2023-12-31')}
                                    />
                                </div>
                            </section>
                            <span
                                className="Transition text-[15px] h-7 w-10 bg-bgActiveNav dark:bg-bgDarkActiveNav flex rounded-xl cursor-pointer hover:shadow-card dark:hover:shadow-cardDark"
                                title="Refresh"
                                onClick={()=>{
                                    setStartDate(new Date("2023-05-01"))
                                    setEndDate(new Date('2023-12-31'))
                                }}
                            >
                                <AiOutlineReload className=" m-auto"/>
                            </span>
                        </div>
                    </div>

                    {/* Data Grid Box */}
                    <Box
                        height= {isError?'400px':'700px'}
                        sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            fontSize:12
                        },
                        "& .MuiDataGrid-cell": {
                            borderColor: "transparent",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderColor: theme.palette.primary.main
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            // backgroundColor: theme.palette.primary.light,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderColor: theme.palette.primary.main
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `theme.palette.primary.main !important`,
                        },
                        "& .MuiTablePagination-displayedRows": {
                            fontSize:13
                        },
                        "& .MuiTablePagination-selectLabel": {
                            fontSize:13
                        },
                        }}
                    >
                       
                        <DataGrid
                            loading={isLoading || !data}
                            getRowId={(row) => row._id}
                            rows={(data && transactions) || []}
                            columns={columns}
                            rowsPerPageOptions={[50,100]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            components={{ 
                                Toolbar: DataGridCustomToolbar,
                                ColumnMenu: CustomColumnMenu 
                            }}
                            componentsProps={{
                                toolbar: { searchHidden:true }
                            }}
                            getRowSpacing={(params) => ({
                                top: params.isFirstVisible ? 5 : 0,
                                bottom: params.isLastVisible ? 5 : 0,
                            })}
                        />
                        
                    
                    </Box>

                </div>
            </div>
        )
    }

  return content
}

export default Transactions