import Iconify from "@/components/iconify";
import { Box, Stack, Typography, colors, useTheme } from "@mui/material";


export default function MilestoneStep(
	{ total, currentStep } : { total: number, currentStep: number }
) {

	const theme = useTheme() as any;

	const getStepBackgroundColor = (_step: number) => {
		let _color = "#e2e8f0";
		if (_step < currentStep) {
			_color = theme.palette.success.light;
		} else if (_step === currentStep) {
			_color = theme.palette.primary.main;
		};
		return _color;
	}

	const getStepColor = (_step: number) => {
		let _color;
		if (_step <= currentStep) {
			_color = 'white';
		} else if (_step === currentStep) {
			_color = theme.palette.text.main;
		};
		return _color;
	}

	return (
		<Stack direction="row" alignItems='center' justifyContent="center" flexWrap='wrap' gap={1}>
			{Array(total).fill(0).map((i, k) => (
				<Stack key={k} direction="row" alignItems='center' gap={0.5}>
					<Box
						sx={{color: `${getStepColor(k+1)}`, padding: '3px 8px', borderRadius: '6px', backgroundColor: `${getStepBackgroundColor(k+1)}`}}
					>
						<Typography fontSize='0.95rem' fontWeight={600}>Milestone {k + 1}</Typography>
					</Box>
					{
						(k + 1) !== total && (
							<Box sx={{color: theme.palette.text.secondary, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
								<Iconify icon="mdi:chevron-right" />
							</Box>
						)
					}
				</Stack>
			))}
		</Stack>
	)
}