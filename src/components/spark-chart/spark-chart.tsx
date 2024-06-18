import React from 'react'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import styled from 'styled-components';

interface ChartProps {
	data: number[]
	bgcolor: 'success'|'danger'
	color: string
	width?: number
	height?: number
	margin?: number
}

const SpartChart = ({data, bgcolor, color, width = 130, height = 34, margin = 8} : ChartProps) => {
	// @ts-ignore

	return (	
		<div style={{width: '100%', height: '100%'}}>
			<StyledSparkLineChart className={bgcolor}>
				<SparkLineChart
					data={data}
					height={height}
					curve="natural"
					area
					colors={[color]}
				/>
			</StyledSparkLineChart>
		</div>
	)
}

export default SpartChart

const StyledSparkLineChart = styled.div`
	&.success {
		path {
			fill: #effbf4;
		}
	}
	&.danger {
		path {
			fill: #fdf1f7;
		}
	}
`