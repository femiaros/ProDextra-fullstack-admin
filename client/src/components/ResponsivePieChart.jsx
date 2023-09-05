import { ResponsivePie } from "@nivo/pie"
import { useTheme } from "@mui/material"

const ResponsivePieChart = ({data,dash}) => {
    const theme = useTheme()

  return (
    <ResponsivePie
        data={data}
        margin={dash && { top: 20, right: 30, bottom: 20, left: 30 }}
        colors={ [theme.palette.alternative.two,theme.palette.primary.main,theme.palette.active.nav] }
        innerRadius={dash && 0.66}
        padAngle={1.5}
        cornerRadius={1}
        activeOuterRadiusOffset={8}
        theme={{
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
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={0} // 3
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2 
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: dash && 'inactive'
                },
                id: 'dots'
            }
        ]}
        legends={undefined}
    />
  )
}

export default ResponsivePieChart