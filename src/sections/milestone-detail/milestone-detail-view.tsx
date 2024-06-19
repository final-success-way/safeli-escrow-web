import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import Iconify from '@/components/iconify';
import { Alert, Breadcrumbs, Button, Card, Collapse, Container, Divider, Grid, IconButton, MenuItem, Rating, Select } from '@mui/material';
import Label from '@/components/label';
import styled from 'styled-components';
import Progress from '@/components/progress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

const tempMilestoneData = [
  { title: 'Web Development', progress: 0.7, date: new Date(), status: 'paid', contactId: '387D4', desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop, tablet and mobile phone.' },
  { title: 'Web Development', progress: 0.5, date: new Date(), status: 'paid', contactId: '387D4', desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop, tablet and mobile phone.' },
  { title: 'Web Development', progress: 0.2, date: new Date(), status: 'paid', contactId: '387D4', desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop, tablet and mobile phone.' },
  { title: 'Web Development', progress: 0.8, date: new Date(), status: 'paid', contactId: '387D4', desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop, tablet and mobile phone.' },
  { title: 'Web Development', progress: 0.9, date: new Date(), status: 'paid', contactId: '387D4', desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop, tablet and mobile phone.' },
]

const tempUserData = {
  name: 'Matthew Olamide', username: '@matthewOlamide', date: new Date(), score: 4.5, verified: { contractInfo: true, bank: true, id: true }
};

const tempTimelineData = [
  { date: new Date(), avatar: '/assets/user-2.png', name: 'Alberto Emmanuel', content: 'Contractor initiated dispute milestone ID #61278D' },
  { date: new Date(), avatar: '/assets/user-3.png', name: 'Jon Massimo', content: 'I gave you the full milestone payment, what exactly is this dispute for??' },
  { date: new Date(), avatar: '', name: '', content: 'Please Provide further evidence or escalate for Safeli decision' },
]

export default function MilestoneDetailView() {
  const theme = useTheme() as any;

  const [status, setStatus] = useState({
    selectedMilestone: 0,
    selectedSortType: 'recent',
    alertOpen: true,
  });

  const [data, setData] = useState<{
    milestoneData: any[]
    userData: any
    timeline: any[]
  }>({
    milestoneData: [],
    userData: {},
    timeline: []
  });

  const breadcrumbs = [
    <Link underline="always" key="1" color="inherit" href="/milestones">Milestones</Link>,
    <Link underline="always" key="1" color="inherit" href="/milestones/payable">Payable</Link>,
    <Typography key="2" color="text.secondary" sx={{ textDecoration: 'underline', textTransform: 'capitalize' }}>Details</Typography>
  ];

  const getData = () => {
		try {
			;setData({...data, milestoneData: tempMilestoneData, userData: tempUserData, timeline: tempTimelineData});
		} catch (error) {
			console.log('getData error: ', error)
		}
	}

	useEffect(() => {
		getData();
	}, [])

  return (
    <Container maxWidth='xl'>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>

      <Box mt={status.alertOpen ? 3 : 0}>
        <Collapse in={status.alertOpen}>
          <Alert
            severity="warning"
            action={
              <IconButton color="inherit" size="small" onClick={() => setStatus({ ...status, alertOpen: false })}>
                <Iconify icon="mdi:close-circle-outline" />
              </IconButton>
            }
            sx={{ boxShadow: theme.shadows[5] }}
          >
            <span style={{ color: theme.palette.warning.main, fontWeight: 550 }}>Action Required: </span>
            <span style={{ color: theme.palette.text.secondary }}>You have a new dispute from Matthew, click the dispute button to review</span>
          </Alert>
        </Collapse>
      </Box>
      <Grid container spacing={2} mt={0.5}>
        <Grid item lg={8.5} md={7.5} sm={12} xs={12} mt={1}>
          <Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%' }}>
            <Stack direction="row" alignItems="center" justifyContent='space-between' flexWrap='wrap' gap={2}>
              <Typography variant='h5'>Milestones</Typography>
              <Stack direction="row" alignItems="center" flexWrap='wrap' gap={1.5}>
                <Label sx={{ padding: '10px 15px', height: 'auto', backgroundColor: '#f1f5f9' }}>
                  <Typography variant='subtitle1' color='text.primary'>Notes (2)</Typography>
                </Label>
                <Button color='inherit' sx={{ alignItems: 'center', gap: '5px', padding: '10px 15px' }}>
                  <Iconify icon="mdi:add-circle-outline" />
                  <Typography variant='subtitle1'>Add Attachment</Typography>
                </Button>
                <Button color='inherit' sx={{ alignItems: 'center', gap: '5px', padding: '10px 15px' }}>
                  <img src="/assets/icons/ic_delete.svg" alt="delete" style={{ width: 18, height: 'auto' }} />
                  <Typography variant='subtitle1' color="error.main">Terminate</Typography>
                </Button>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" flexWrap='wrap' gap={1} mt={3}>
              {Array(data.milestoneData.length).fill(0).map((i, k) => (
                <Button
                  key={k}
                  sx={{
                    padding: '7px 10px',
                    borderRadius: '4px',
                    backgroundColor: `${status.selectedMilestone === k ? '#0f172a !important' : '#e7effc !important'}`,
                    color: `${status.selectedMilestone === k ? 'white' : 'text.primary'}`,
                  }}
                  onClick={() => setStatus({ ...status, selectedMilestone: k })}
                >
                  <Typography>Milestone {k + 1}</Typography>
                </Button>
              ))}
            </Stack>
            <Grid container mt={2}>
              <Grid item lg={4} md={6} sm={6} xs={12} mt={2}>
                <Typography color='text.secondary'>Milestone Title</Typography>
                <Typography variant='subtitle1' mt={0.5}>{data.milestoneData?.[status.selectedMilestone]?.title}</Typography>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12} mt={2}>
                <Typography color='text.secondary'>Milestone Progress</Typography>
                <Box mt={0.5}>
                  <Progress value={data.milestoneData?.[status.selectedMilestone]?.progress * 100} />
                </Box>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12} mt={2}>
                <Typography color='text.secondary'>Contact</Typography>
                <Typography
                  variant='subtitle1' mt={0.5} sx={{cursor: 'pointer'}}
                  onClick={() => {}}
                >
                  View Contract
                </Typography>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12} mt={2}>
                <Typography color='text.secondary'>Start Date</Typography>
                <Typography variant='subtitle1' mt={0.5}>{data.milestoneData?.[status.selectedMilestone]?.date?.toDateString()}</Typography>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12} mt={2}>
                <Typography color='text.secondary'>Status</Typography>
                <Label color='info' mt={0.5}>
                  <Stack direction="row" alignItems="center" gap="3px">
                    <span style={{fontSize: '1.5rem', lineHeight: 1, marginBottom: '2px'}}>•</span>
                    <Typography fontSize='0.9rem' lineHeight={1}>{data.milestoneData?.[status.selectedMilestone]?.status}</Typography>
                  </Stack>    
                </Label>
              </Grid>
              <Grid item lg={4} md={6} sm={6} xs={12} mt={2}>
                <Typography color='text.secondary'>Contract ID</Typography>
                <Typography variant='subtitle1' mt={0.5}>#{data.milestoneData?.[status.selectedMilestone]?.contactId}</Typography>
              </Grid>
              <Grid item xs={12} mt={4}>
                <Typography variant='subtitle1'>Milestone Description</Typography>
                <Typography color='text.secondary' fontSize='0.95rem' mt={0.5}>{data.milestoneData?.[status.selectedMilestone]?.desc}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item lg={3.5} md={4.5} sm={12} xs={12} mt={1}>
          <StyledUserCard>
            <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[20], height: '100%' }}>
              <img src="/assets/user_back.png" alt="user_back" className='back' />
              <Box className="user-info">
                <img src="/assets/user.png" alt="avatar" />
                <Typography variant='h6' mt={1}>{data.userData?.name}</Typography>
                <Typography color='text.secondary'>{data.userData?.username}</Typography>
              </Box>
              <Box sx={{ padding: '1rem' }}>
                <Stack direction="row" alignItems="center" justifyContent='space-between' gap={1}>
                  <Typography fontSize="0.95rem" color='text.secondary'>{data.userData?.date?.toDateString()}</Typography>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <Rating
                      name="user-score"
                      value={data.userData?.score || 0}
                      readOnly
                      precision={0.5}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Typography variant='h6'>{data.userData?.score}</Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ mt: 1 }} />
                <Stack direction="column" justifyContent='space-between' flex={1}>
                  <Box>
                    <Stack direction="row" alignItems="center" justifyContent='space-between' mt={1}>
                      <Typography fontWeight={600} color='text.secondary'>Contact Info</Typography>
                      {data.userData?.verified?.contractInfo && <img src="/assets/icons/ic_verify.svg" alt="verify" style={{ width: 20, height: 20 }} />}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent='space-between' mt={1}>
                      <Typography fontWeight={600} color='text.secondary'>Bank Details</Typography>
                      {data.userData?.verified?.bank && <img src="/assets/icons/ic_verify.svg" alt="verify" style={{ width: 20, height: 20 }} />}
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent='space-between' mt={1}>
                      <Typography fontWeight={600} color='text.secondary'>ID Verification</Typography>
                      {data.userData?.verified?.id && <img src="/assets/icons/ic_verify.svg" alt="verify" style={{ width: 20, height: 20 }} />}
                    </Stack>
                  </Box>
                  <Grid container spacing={1} mt={1}>
                    <Grid item xs={6} mt={1}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: `${theme.palette.background.primary} !important`, padding: '10px 15px', width: '100%', border: `1px solid ${theme.palette.background.primary}`
                        }}
                        onClick={() => { }}
                      >
                        View Detail
                      </Button>
                    </Grid>
                    <Grid item xs={6} mt={1}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: `white !important`, padding: '10px 15px', width: '100%', color: 'text.primary', border: '1px solid #dbe0e6', gap: '5px'
                        }}
                        onClick={() => { }}
                      >
                        <Iconify icon="mdi:chat-processing-outline" />
                        Chat
                      </Button>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
              <button className='icon-btn'>
                <Iconify icon="mdi:dots-vertical" width={20} color="white" />
              </button>
            </Card>
          </StyledUserCard>
        </Grid>
        <Grid item xs={12} mt={1}>
          <Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20] }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
              <Typography variant='h5'>Timeline</Typography>
              <StyledSelect>
                <Select
                  labelId="sort-type"
                  id="sort-type"
                  value={status.selectedSortType}
                  onChange={e => setStatus({ ...status, selectedSortType: e.target.value })}
                  IconComponent={ExpandMoreIcon}
                >
                  <MenuItem value={'recent'}>Sort by: <b>Recent</b></MenuItem>
                  <MenuItem value={'toppest'}>Sort by: <b>Toppest</b></MenuItem>
                </Select>
              </StyledSelect>
            </Stack>
            <Stack direction="column" alignItems="center">
              <Box>
                {data.timeline.map((i, k) => (
                  <StyledTimeline key={k}>
                    <Box className="user">
                      <img src={!!i.avatar ? i.avatar : '/assets/light-logo-2.svg'} alt={!!i.avatar ? i.avatar : 'safeli'} className='avatar' />
                      <Typography variant='h6' lineHeight={1}>{i.name || 'Safeli Support'}</Typography>
                    </Box>
                    <Box className={`content ${k === data.timeline.length - 1 ? 'none-border' : ''}`}>
                      <Box className="card">
                        <Stack direction="row" alignItems="center" gap={1}>
                          <img src="/assets/icons/ic_calendar.svg" alt="calendar" />
                          <Typography color='text.secondary' fontSize='0.95rem'>{i.date.toDateString()}</Typography>
                        </Stack>
                        <Typography mt={0.5}>{i.content}</Typography>
                      </Box>
                    </Box>
                  </StyledTimeline>
                ))}
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

const StyledUserCard = styled.div`
	height: 100%;
	position: relative;
	.icon-btn {
		position: absolute;
		top: 10px;
		right: 10px;
    background-color: white;
    border-radius: 8px;
    padding: 8px 9px;
    border: 0;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #e7ebef;
    }
    svg {
      color: #64748b;
    }
	}
	.back {
		width: 100%;
	}
	.user-info {
		margin-top: -3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			width: 6rem;
			height: auto;
			border-radius: 50%;
		}
	}
`

const StyledTimeline = styled.div`
	padding: 0.5rem;
	.user {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		.avatar {
			width: 26px;
			height: auto;
			border-radius: 50%;
		}
	}
	.content {
		margin: 0.7rem 0;
		padding: 0.5rem 0;
		border-left: 1px solid #e7eaee;
		margin-left: 13px;
		&.none-border {
			border-left-color: transparent;
		}
		.card {
			padding: 1rem;
			border: 1px solid #e7eaee;
			border-radius: 8px;
			margin-left: calc(1rem + 13px);
		}
	}
`

const StyledSelect = styled.div`
  > div {
    > div {
      padding: 12px 15px;
      background-color: #f8fafc;
    }
  }
`