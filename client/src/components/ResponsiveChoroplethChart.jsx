import { ResponsiveChoropleth } from "@nivo/geo"
import { useTheme } from "@mui/material"
import { geoData } from "../app/geoData" 

const ResponsiveChoroplethChart = ({data}) => {
    const theme = useTheme()

  return (
    <ResponsiveChoropleth
        data={data}
        features={geoData.features}
        theme={{
            axis: {
                domain: {
                        line: {
                        stroke: 'red',
                    },
                },
                legend: {
                    text: {
                        fill: 'blue',
                    },
                },
                ticks: {
                    line: {
                        stroke: 'yellow',
                        strokeWidth: 1,
                    },
                    text: {
                        fill: 'green',
                    },
                },
            },
            legends: {
                text: {
                    fill: 'gold',
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
            },
        }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors=  {[ theme.palette.primary.main ]}
        domain={[ 0, 60 ]}
        unknownColor="#9294A1"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={97}
        projectionTranslation={[ 0.5, 0.65 ]}
        projectionRotation={[ 0, 0, 0 ]}
        borderWidth={0}
        borderColor={theme.palette.primary.main}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: theme.palette.alternative.two,
                size: 2,
                padding: 1,
                stagger: true
            },
        ]}
        fill={[
            {
                match: {
                    id: 'NGA'
                },
                id: 'dots'
            }
        ]}
        legends={ undefined }
    />
  )
}

export default ResponsiveChoroplethChart