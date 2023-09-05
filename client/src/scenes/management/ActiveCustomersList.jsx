import { countries } from "country-data"
import { useState } from "react"
import {AiOutlineReload} from 'react-icons/ai'
import { Box,useTheme,useMediaQuery } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar"
import CustomColumnMenu from "../../components/DataGridCustomColumnMenu"
import ImageHolder from "../../components/ImageHolder"
import { useGetActiveCustomersQuery } from './managementApiSlice'

const ActiveCustomersList = () => {
  const theme = useTheme()
  const isNonMediumScreens = useMediaQuery("(min-width: 840px)")
  const isSmallScreens = useMediaQuery("(max-width: 620px)")

  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")

  const { 
    data, 
    isLoading,
    isError,
    error
  } = useGetActiveCustomersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search
  })

  let columns = [
    {
      field: "firstName",
      headerName: "Customer Name",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`
    },
    {
      field: "company",
      headerName: "Company",
      flex: 0.5,
      sortable: false,
    },
    {
      field: "phone",
      headerName: "Phone No",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
      sortable: false,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => `${countries[params.value].name}`,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className={`${params.value? 'bg-bgStatGreen text-statGreen border-statGreen': 'bg-bgStatRed text-statRed border-statRed'} w-16 h-6 text-[10px] flex items-center justify-center border-solid border-[1px] rounded-md`}>
            {params.value? 'Active': 'Inactive'}
          </div>
        ) 
      }
    },
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      renderCell: (params) => {
        return (
          <span className="h-[33px] w-[33px] rounded-full overflow-hidden">
            <ImageHolder 
              src={params.row.avatar} 
              hashString={"LGF5?xYk^6#M@-5c,1J5@[or[Q6."}
              altString={"customer-thumb" }
            />
          </span>
        )
      },
      sortable: false,
      filterable: false,
    }
  ]

  {/* --- Remove Column On Medium Screen--- */}
  if(!isNonMediumScreens){
    columns = columns.filter(({field})=>{
      return field==='firstName' || field==='company' || field==='country' || field==='active' || field==='avatar'
    })
  }
  {/* --- Remove Column On Small Screen--- */}
  if(isSmallScreens){
    columns = columns.filter(({field})=>{
      return field==='firstName' || field==='active' || field==='avatar'
    })
  }

  return (
    <div className="p-4 pb-2 rounded-2xl bg-bgSecondary dark:bg-bgDarkSecondary shadow-card dark:shadow-cardDark">
      {/* Title */}
      <h2 className=' font-semibold'>Active Customers</h2>

      {/* Data Grid Box */}
      <Box
        height= '700px'
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize:12
          },
          "& .MuiDataGrid-cell": {
            borderColor: "transparent"
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
        {
          isError ?(
            <div className={`${error?.error? 'text-statRed bg-bgStatRed': 'bg-bgActiveNav dark:bg-bgDarkActiveNav'} w-fit mx-auto mt-10 px-5 py-3 text-xs flex items-center font-medium rounded-md`}>
              {`${error?.data?.message || error?.error}`}
              {error?.data?.message&& (
                <span 
                  className="ml-2 text-sm bg-primaryDark dark:bg-primary cursor-pointer px-3 py-2 rounded-xl"
                  title="Refresh"
                  onClick={()=>setSearch('')}
                >
                  <AiOutlineReload/>
                </span>
              )}
            </div>
          ) :(
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data && data.customers) || []}
              columns={columns}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 5 : 0,
                bottom: params.isLastVisible ? 5 : 0,
              })}
              rowCount={(data && data.total) || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={page}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ 
                Toolbar: DataGridCustomToolbar,
                ColumnMenu: CustomColumnMenu 
              }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          )
        }
    
      </Box>

    </div>
  )
}

export default ActiveCustomersList