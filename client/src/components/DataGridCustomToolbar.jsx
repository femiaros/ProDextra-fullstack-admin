import {RiSearch2Line} from 'react-icons/ri'
import { IconButton, TextField, InputAdornment,useMediaQuery } from "@mui/material"
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid"
import FlexBetween from "./FlexBetween"

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch,searchHidden }) => {
  const isSmallScreens = useMediaQuery("(max-width: 640px)")

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton
            sx={{
              fontSize:12,
              display:`${isSmallScreens && 'none'}`
            }}
          />
          <GridToolbarDensitySelector  
            sx={{
              fontSize:12,
              display:`${isSmallScreens && 'none'}`
            }}
          />
          <GridToolbarExport
            sx={{
              paddingBottom: `${isSmallScreens && '0px'}`
            }}
          />
        </FlexBetween>
        {
          !searchHidden && (
            <TextField
              label="Search..."
              sx={{ 
                mb: "0.5rem", 
                width: `${isSmallScreens ? '10rem' : '13rem'}`, 
                "& .MuiFormLabel-root": {
                  fontSize:14
                },
                "& .MuiInputBase-input": {
                  fontSize:14
                },
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setSearch(searchInput)
                        setSearchInput("")
                      }}
                    >
                      <RiSearch2Line className=' text-lg' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )
        }
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar
