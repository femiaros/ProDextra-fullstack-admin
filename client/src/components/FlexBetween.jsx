// const { Box } = require("@mui/material")
import { Box} from "@mui/material"
// const { styled } = require("@mui/system")
import { styled } from "@mui/system"

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
})

export default FlexBetween