import { Box, Breadcrumbs, Container, Link, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import StepWizard from "react-step-wizard";

import SelectMilestoneTypeView from "./select-milestone-type-view";
import { useResponsive } from "@/hooks/use-responsive";
import { AddMilestonesView } from "./add-milestones-view";
import useSocket from "@/context/use-socket";
import React from "react";
import MilestoneDescriptionView from "./milestone-description-view";
import AddContractView from "./add-contract-view";
import ReviewView from "./review-view";
import { useLocation } from "react-router-dom";

const steps = ['Detail', 'Milestone', 'Contract', 'Review'];

export default function CreateMilestoneView() {
	const { createMilestoneStep, update } = useSocket();
	const lgDown = useResponsive('down', 'lg');
	const location = useLocation();

	const [step, setStep] = useState(1);

	const getNameOfStep = (_step: number) => {
		let _name = 'Pay Fixed Price';
		// switch(_step) {
		// 	case 2:
		// 		_name = ''
		// 		break;
		// }
		return _name;
	}

	const breadcrumbs = [
		<Link underline="always" key="1" color="inherit" href="/milestones">Milestones</Link>,
		<Link underline="always" key="1" color="inherit" href="/milestones/create">Create Milestone</Link>,
		<Typography key="2" color="text.secondary" sx={{textDecoration: 'underline', textTransform: 'capitalize'}}>
			{getNameOfStep(step)}
		</Typography>
	];

	React.useEffect(() => {
		setStep(createMilestoneStep);
	}, [createMilestoneStep]);

	React.useEffect(() => {
		if (!location.hash) {
			update({createMilestoneStep: 1})
		}
	}, [location.pathname])

	return (
		<Box>
			<Container maxWidth="xl">
				<Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap={`${lgDown ? 'wrap' : 'nowrap'}`} sx={{gap: '15px'}}>
					<Box>
						{step > 2 && (
							<Breadcrumbs separator="›" aria-label="breadcrumb">
								{breadcrumbs}
							</Breadcrumbs>
						)}
					</Box>
					{step > 1 && (
						<StyledStepper>
							<Stepper activeStep={step - 2 > 0 ? step - 2 : 0}>
								{steps.map((label, index) => {
									const stepProps: { completed?: boolean } = {};
									const labelProps: {
										optional?: React.ReactNode;
									} = {};
									return (
										<Step key={label} {...stepProps}>
											<StepLabel {...labelProps}>{label}</StepLabel>
										</Step>
									);
								})}
							</Stepper>
						</StyledStepper>
					)}
				</Stack>
				<StyledContentPanel>
					<StepWizard initialStep={step} isHashEnabled={true} >
						<SelectMilestoneTypeView hashKey="welcome" />
						<MilestoneDescriptionView hashKey="detail" />
						<AddMilestonesView hashKey="add-milestones" /> 
						<AddContractView hashKey="add-contract" /> 
						<ReviewView hashKey="review" /> 
					</StepWizard>
				</StyledContentPanel>
			</Container>
		</Box>
	)
}

const StyledContentPanel = styled.div`
	height: 100%;
	max-width: calc(100vw - 200px);
	margin: 32px auto;
	@media (max-width: 1200px) {
		max-width: 100%;
	}
	.rsw_2f {
		display: none;
	}
	.rsw_3G {
		display: block;
	}
`

const StyledStepper = styled.div`
	max-width: 600px;
	flex: 1;
	.MuiStepLabel-label {
		font-weight: 600 !important;
		line-height: 1.5;
	}
	.Mui-completed {
		color: #2b2929 !important;
	}
	.Mui-active, .Mui-disabled {
		padding-right: 0;
		circle {
			display: none;
		}
		text {
			font-size: 0.9rem;
			font-weight: 600;
		}
	}
	.Mui-active {
		text {
			fill: #2b2929;
		}
	}
	.Mui-disabled {
		text {
			fill: #64748b;
		}
	}
`