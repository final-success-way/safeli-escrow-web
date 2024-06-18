import Iconify from "@/components/iconify";
import { Box, Stack, Typography, colors, useTheme } from "@mui/material";


export default function Progress(
	{ value } : { value: number }
) {

	const theme = useTheme() as any;

	const getStepBackgroundColor = (_current: number) => {
		let _color = "#e2e8f0";
		if (_current <= value) {
			_color = theme.palette.success.light;
		} else if (_current - 20 <= value) {
			_color = theme.palette.warning.main;
		};
		return _color;
	}

	const getStepColor = (_current: number) => {
		let _color;
		if ((_current <= value) || (_current - 20 <= value)) {
			_color = 'white';
		} else if (_current === value) {
			_color = theme.palette.text.main;
		};
		return _color;
	}

	return (
		<Stack direction="row" alignItems='center' flexWrap='nowrap'>
			{Array(5).fill(0).map((i, k) => (
				<Box
					key={k}
					sx={{
						color: `${getStepColor((k+1) * 20)}`,
						padding: '2px 7px',
						borderRadius: `${k === 0 ? '8px 0 0 8px' : (k === 4 ? '0 8px 8px 0' : '0px')}`,
						backgroundColor: `${getStepBackgroundColor((k+1) * 20)}`
					}}
				>
					<Typography fontSize='0.95rem'>{(k + 1) * 20}%</Typography>
				</Box>
			))}
		</Stack>
	)
}