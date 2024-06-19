import Iconify from "@/components/iconify";
import Label from "@/components/label";
import { MarkdownEditor } from "@/components/markdown/markdown";
import { useResponsive } from "@/hooks/use-responsive";
import { AppBar, Autocomplete, Box, Button, Drawer, Grid, InputAdornment, MenuItem, Select, Stack, Tab, Tabs, TextField, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const subjectData = [
	{title: 'Services Agreement', value: 'services-agreement'},
	{title: 'Letter of Intent', value: 'letter-of-intent'},
	{title: 'Marketing Agency', value: 'marketing-agency'},
	{title: 'Design', value: 'design'},
	{title: 'Master Service Agreement', value: 'master-service-agreement'},
	{title: 'Product Management', value: 'product-management'},
]

export default function AddMilestoneDrawer(
	{ isOpen, onClose }: { isOpen: boolean, onClose: () => void }
) {
	const theme = useTheme() as any;
	const mdDown = useResponsive('down', 'md');
	const [status, setStatus] = useState({
		title: '',
		amount: 0,
		desc: '',
		selectedTab: 'generate',
		selectedSubject: '',
		generateContractContent: ''
	});

	const refFile = useRef<HTMLInputElement>(null)

	const onBack = () => {
		onClose();
	}

	const onNext = () => {
		onClose();
	}

	const onUploadFile = (file: File) => {

	}

	return (
		<Drawer
			anchor={'right'}
			open={isOpen}
			onClose={onClose}
		>
			<Box sx={{padding: '2rem 2.5rem', width: '100%', minWidth: !mdDown ? 600 : '100vw', maxWidth: 1000}}>
				<Typography variant="h5">Add Milestone</Typography>
				<Grid container spacing={2} mt={1}>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>Project Title</Typography>
						<StyledInput>
							<TextField
								name="project-title"
								type='string'
								placeholder='We need you as a Frontend Developer to review our  prototype and suggest improvements.'
								value={status.title}
								onChange={e => setStatus({...status, title: e.target.value})}
								sx={{width: '100%', mt: 0.5}}
							/>
						</StyledInput>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>Project Description</Typography>
						<StyledInput>
							<TextField
								name="project-description"
								type='string'
								placeholder='We need you as a Frontend Developer to review our  prototype and suggest improvements.'
								multiline
								rows={3}
								value={status.desc}
								onChange={e => setStatus({...status, desc: e.target.value})}
								sx={{width: '100%', mt: 0.5}}
							/>
						</StyledInput>
					</Grid>
					<Grid item xs={12}>
						<Typography variant='subtitle1'>Phase Amount</Typography>
						<StyledInput>
							<TextField
								name="total-amount"
								type='number'
								value={status.amount}
								onChange={e => setStatus({...status, amount: Number(e.target.value)})}
								sx={{width: '100%', mt: 0.5}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Iconify icon='mdi:dollar' />
										</InputAdornment>
									),
								}}
							/>
						</StyledInput>
					</Grid>
					<Grid item xs={12}>
						<Box sx={{backgroundColor: '#f5f6f6', padding: '1rem', borderRadius: '10px'}}>
							<StyledAppBar>
								<AppBar position="static">
									<Tabs orientation={'horizontal'} value={status.selectedTab}>
										<Tab label="Generate Contract" value={'generate'} onClick={() => setStatus({...status, selectedTab: 'generate'})} />
										<Tab label="Upload Contract" value={'upload'} onClick={() => setStatus({...status, selectedTab: 'upload'})} />
										<Tab label="Use a Template" value={'template'} onClick={() => setStatus({...status, selectedTab: 'template'})} />
									</Tabs>
								</AppBar>
							</StyledAppBar>
							<Box sx={{backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px', mt: '10px'}}>
								{status.selectedTab === 'generate' && (
									<Box>
										<MarkdownEditor text={status.generateContractContent} onChange={(text) => setStatus({...status, generateContractContent: text})} style={{ height: '12rem' }} />
									</Box>
								)}
								{status.selectedTab === 'upload' && (
									<Box>
										<Button
											sx={{display: "flex", flexDirection: 'column', alignItems: 'center', gap: '10px', backgroundColor: '#e7effc !important', border: `1px dashed ${theme.palette.text.primary}`, padding: '2rem 1rem', width: '100%'}}
											onClick={() => { refFile.current?.click() }}
										>
											<input ref={refFile} type="file" id="upload-file" style={{ display: 'none' }} accept='image/*,.doc,.docx,.pdf' onChange={e => !!e.target.files && onUploadFile(e.target.files[0])} />
											<img src="/assets/icons/ic_upload.svg" alt="upload" style={{width: 30, height: 30}} />
											<Typography color='text.secondary'>Drag & Drop or <span style={{color: theme.palette.text.primary}}>Choose file</span> to upload JPG, PNG, or PDF</Typography>
											<Typography color='text.secondary' fontSize='0.9rem'>Maximum file size: 50 MB</Typography>
										</Button>
									</Box>
								)}
								{status.selectedTab === 'template' && (
									<Box>
										<Typography variant="subtitle1">Subject</Typography>
										<Select
											value={status.selectedSubject}
											onChange={e => setStatus({...status, selectedSubject: e.target.value})}
											sx={{width: '100%', mt: 1}}
											IconComponent={ExpandMoreIcon}
										>
											{subjectData.map((i, k) => (
												<MenuItem key={k} value={i.value}>{i.title}</MenuItem>
											))}
										</Select>

										<Typography variant="subtitle1" mt={3}>Recent selections</Typography>
										<Stack direction="row" alignItems="center" flexWrap='wrap' columnGap={1}>
											{subjectData.slice(0, 3).map((i, k) => (
												<Label key={k} sx={{padding: '7px 10px', height: 'auto', borderRadius: '12px', mt: 1, backgroundColor: '#f1f5f9'}}>
													<Typography color={theme.palette.text.primary}>{i.title}</Typography>
												</Label>
											))}
										</Stack>
									</Box>
								)}
							</Box>
							<Grid container spacing={1} mt={2}>
								<Grid item md={4} sm={6} xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
									<Typography
										variant='h6'
										style={{color: theme.palette.error.main, textDecoration: 'underline', cursor: 'pointer'}}
									>
										Reset
									</Typography>
								</Grid>
								<Grid item md={4} sm={6} xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
									{status.selectedTab === 'generate' && (
										<Typography
											variant='h6'
											style={{color: theme.palette.info.main, textDecoration: 'underline', cursor: 'pointer'}}
										>
											Generate
										</Typography>
									)}
								</Grid>
								<Grid item md={4} sm={6} xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
									<Typography
										variant='h6'
										style={{color: theme.palette.success.main, textDecoration: 'underline', cursor: 'pointer'}}
									>
										Save Template
									</Typography>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
				<Grid container sx={{width: '100%'}} spacing={2} mt={2}>
          <Grid item xs={6} mt={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: `${theme.palette.background.gray} !important`, padding: '12px 20px', fontSize: '1rem', width: '100%', color: 'text.secondary', border: '1px solid #dbe0e6', borderRadius: '12px'
              }}
              onClick={onBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={6} mt={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: `${theme.palette.background.primary} !important`, padding: '12px 20px', fontSize: '1rem', width: '100%', border: `1px solid ${theme.palette.background.primary}`, borderRadius: '12px'
              }}
              onClick={onNext}
            >
              Next
            </Button>
          </Grid>
        </Grid>
			</Box>
		</Drawer>
	)
}

const StyledAppBar = styled.div`
	.MuiAppBar-positionStatic {
		background-color: transparent;
		box-shadow: none;
		position: relative;
		button {
			flex: 1;
			background-color: transparent;
			z-index: 9;
			border-radius: 12px;
			&.Mui-selected {
				color: #212B36;
			}
		}
		.MuiTabs-indicator {
			height: 100%;
			background-color: white;
			border-radius: 12px;
			z-index: 0;
			transition: all 0.5s;
		}
	}
`

const StyledInput = styled.div`
  .MuiInputBase-root {
    border-radius: 12px;
  }
	.Mui-focused {
    fieldset {
      border-color: #2b2929 !important;
    }
  }
`