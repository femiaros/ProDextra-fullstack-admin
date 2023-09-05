import React from 'react'
import { ResponsiveBar } from "@nivo/bar"
import { useTheme,useMediaQuery } from "@mui/material"

const ResponsiveBarChart = ({ data,dash }) => {
    const theme = useTheme()
    const isNonMediumScreens = useMediaQuery("(min-width: 690px)")

  return (
    <ResponsiveBar
        data={data}
        groupMode= "grouped"
        layout= {dash ? "vertical":"horizontal"}
        keys={
            dash? ['first','second']
            : ['total']
        }
        indexBy={dash ? "weeks":"country"}
        theme={{
            axis: {
                ticks: {
                    text: {
                        fill: theme.palette.primary.main,
                    },
                },
            }
        }}
        margin={
            dash ? { top: 15, right:-5, bottom: 45, left: 47 }
            : !dash&&!isNonMediumScreens? { top: 0, right:15, bottom:30, left: 65 } 
            : { top: 0, right:20, bottom:30, left: 90 }
        }
        padding={dash ? 0.1 : 0.4}
        innerPadding={5}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={ [theme.palette.primary.main,theme.palette.alternative.two] }
        borderWidth={0}
        borderRadius={dash?8:6}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            legend: dash && '',
            tickSize: 0
        }}
        axisLeft={{
            format: (v) => {
                v = v.toString()
                if(dash && (v.length===1)) return ''
                return dash && new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',minimumFractionDigits:0}).format(v)
            },
            legend: dash && '',
            tickSize: 0,
            tickValues: 5
            
        }}
        enableGridY={dash ?false:false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0'
                ]
            ]
        }}
        legends={undefined}
        tooltip={({ id, value,color})=>(
            <div style={{
                padding: 8,
                color,
                fontSize:11,
                background: theme.palette.primary.bg,
                borderRadius: '6px',
            }}>    
                <strong>
                    {
                        dash? `Total: $${value}`:`Customers: ${value}`
                    }
                </strong>
            </div>
        )}
        role="application"
        ariaLabel="bar chart"
        barAriaLabel={e=>e.id+": "+e.formattedValue+`${dash?'in weeks:':'in country'}`+e.indexValue}
    />
  )
}

export default ResponsiveBarChart