import { ResponsiveLine } from '@nivo/line'
import { useTheme,useMediaQuery } from "@mui/material"

const ResponsiveLineChart = ({data,dash}) => {
    // *** Required-states && Setups ***
    const theme = useTheme()
    const isSmallScreens = useMediaQuery("(max-width: 450px)")

  return (
    <ResponsiveLine
        data={data}
        margin={ 
            dash ? { top: 20, right: 12, bottom: 50, left: 50 }
            :!dash && isSmallScreens 
                ?{ top: 30, right: 9, bottom: 42, left: 33 } 
                : {top: 30, right: 9, bottom: 42, left: 48}
        }
        colors={ 
            dash ? [theme.palette.alternative.two] 
            : [theme.palette.primary.main,theme.palette.alternative.two] 
        }
        theme={{
            axis: {
                ticks: {
                    text: {
                        fill: theme.palette.primary.main,
                    },
                },
            },
            tooltip: {
                container: {
                    color: theme.palette.primary.main,
                    background: theme.palette.primary.bg,
                    padding: 8,
                    fontSize:11,
                    borderRadius: '6px',
                },
            }
        }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        animate
        curve="natural"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            tickPadding: dash ? 35 : 17,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            format: (v) => {
                v = v.toString()
                const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:0}).format(v)
                if(v.length===1) return '0'
                if(isSmallScreens){
                    return `${formatted.split(',')[0]}k`
                } 
                return formatted
            },
            tickSize: 0,
            tickValues: 5,
            tickPadding: 8,
            tickRotation: 0,
            legend: '', 
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        enableArea={true}
        areaBaselineValue={20}
        pointSize={6} //10
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={theme.palette.primary.main}
        pointLabelYOffset={-2}
        useMesh={true}
        legends={ undefined }
    />
  )
}

export default ResponsiveLineChart