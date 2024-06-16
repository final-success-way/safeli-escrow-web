import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Iconify from '@/components/iconify';
import { useResponsive } from '@/hooks/use-responsive';
import { Breadcrumbs, FormControl, InputAdornment, InputLabel, Link, MenuItem, Select, Table, TableBody, TableContainer, TablePagination, TextField, useTheme } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Scrollbar from '@/components/scrollbar';
import MilestoneTableHead from '../milestone-table-head';
import MilestoneTableRow from '../milestone-table-row';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import React, { useState } from 'react';
import { milestones } from '@/_mock/milestones';
import { applyFilter, emptyRows, getComparator } from '../utils';
import { useLocation } from 'react-router-dom';
import { useRouter } from '@/routes/hooks';

// ----------------------------------------------------------------------

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function MilestonesView() {
	const theme = useTheme();
	const lgDown = useResponsive('down', 'lg');
	const location = useLocation();
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [tab, setTab] = useState('');
	const [status, setStatus] = useState({
		selectedPaymentType: '',
		selectedMilestoneType: '',
		searchText: ''
	})

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

	React.useEffect(() => {
		if ((location.pathname === '/milestones') || (location.pathname === '/milestones/')) {
			router.push('/milestones/receivable');
		} else {
			setTab(location.pathname?.replace('/milestones/', ''));
		}
	}, [location.pathname])

	const breadcrumbs = [
    <Link underline="always" key="1" color="inherit" href="/milestones" /* onClick={handleClick} */>
      Milestones
    </Link>,
    <Typography key="2" color="text.primary" sx={{textDecoration: 'underline', textTransform: 'capitalize'}}>
      {location.pathname?.replace('/milestones/', '')}
    </Typography>,
  ];

	return (
		<Container maxWidth="xl">
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Breadcrumbs separator="›" aria-label="breadcrumb">
					{breadcrumbs}
				</Breadcrumbs>
				<Button
					variant="contained"
					sx={{gap: '10px', padding: '10px 20px', maxWidth: '300px', background: '#2b2929 !important', color: 'white'}}
				>
					<Iconify icon="mdi:add-circle-outline" />
					<Typography><b>Create Milestone</b></Typography>
				</Button>
			</Stack>
			<Grid container spacing={3} mt='15px'>
				<Grid lg={12} md={12} container spacing={3}>
					<Grid lg={3} md={12} sm={12} xs={12} spacing={3}>
						<Stack direction="column" justifyContent="space-between" spacing={2} sx={{height: '100%'}}>
							<Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20]}}>
								<img src="/assets/icons/ic_created.svg" alt="created" style={{ width: 50, height: 50 }} />
								<Box>
									<Typography fontSize='0.9rem'>Total Balance</Typography>
									<Typography variant="h5">$154,655</Typography>
								</Box>
							</Card>
							<Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20]}}>
								<img src="/assets/icons/ic_pending.svg" alt="pending" style={{ width: 50, height: 50 }} />
								<Box>
									<Typography fontSize='0.9rem'>Awaiting Payment</Typography>
									<Typography variant="h5">$1,655</Typography>
								</Box>
							</Card>
							<Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20]}}>
								<img src="/assets/icons/ic_completed.svg" alt="compeleed" style={{ width: 50, height: 50 }} />
								<Box>
									<Typography fontSize='0.9rem'>Completed Payment</Typography>
									<Typography variant="h5">$312,870</Typography>
								</Box>
							</Card>
						</Stack>
					</Grid>
					<Grid lg={9} md={12} sm={12} xs={12}>
						<Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20]}}>
							<Typography variant="h5">Payment Information</Typography>
							<Grid container spacing={2}>
								<Grid lg={6} md={7} sm={12} xs={12}>
									<StyledCarousel>
										<Carousel
											swipeable={true}
											draggable={true}
											showDots={false}
											responsive={responsive}
											ssr={true}
											infinite={true}
											autoPlay={true}
											autoPlaySpeed={10000}
											keyBoardControl={true}
											customTransition="all 0.5s"
											transitionDuration={500}
										>
											{Array(3).fill(0).map((i, k) => (
												<Box key={k}>
													<img src="/assets/payment_img.png" alt="payment_img" draggable={false} style={{width: '100%', height: 'auto'}} />
												</Box>
											))}
										</Carousel>
									</StyledCarousel>
								</Grid>
								<Grid lg={6} md={5} sm={12} xs={12}>
									<Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px">
										<Typography variant="subtitle1">Card Lists</Typography>
										<Stack direction="row" justifyContent="center" alignItems="center" gap="5px" sx={{cursor: 'pointer'}} onClick={() => {}}>
											<Iconify icon="mdi:add-circle-outline" />
											<Typography variant="subtitle2">Add New</Typography>
										</Stack>
									</Stack>
									<Stack direction="column" spacing={2} mt='30px'>
										<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', padding: '10px', border: '1px solid #E2E8F0', borderRadius: '10px'}}>
											<Box sx={{width: 40, display: 'flex', justifyContent: 'center', flexShrink: 0}}>
												<img src="/assets/mastercard.png" alt="mastercard" style={{maxWidth: '100%', maxHeight: '100%'}} />
											</Box>
											<Box>
												<Typography variant='subtitle1'>Mastercard</Typography>
												<Stack direction="row" alignItems="center" gap="10px">
													<Typography color="text.secondary">5271****7832</Typography>
													<Typography color="text.secondary">07/24</Typography>
												</Stack>
											</Box>
										</Box>
										<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', padding: '10px', border: '1px solid #E2E8F0', borderRadius: '10px'}}>
											<Box sx={{width: 40, display: 'flex', justifyContent: 'center', flexShrink: 0}}>
												<img src="/assets/visa.png" alt="visa" style={{maxWidth: '100%', maxHeight: '100%'}} />
											</Box>
											<Box>
												<Typography variant='subtitle1'>Visa</Typography>
												<Stack direction="row" alignItems="center" gap="10px">
													<Typography color="text.secondary">7248****3643</Typography>
													<Typography color="text.secondary">02/25</Typography>
												</Stack>
											</Box>
										</Box>
										<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px', padding: '10px', border: '1px solid #E2E8F0', borderRadius: '10px'}}>
											<Box sx={{width: 40, display: 'flex', justifyContent: 'center', flexShrink: 0}}>
												<img src="/assets/paypal.png" alt="paypal" style={{maxWidth: '100%', maxHeight: '100%'}} />
											</Box>
											<Box>
												<Typography variant='subtitle1'>Paypal</Typography>
												<Typography color="text.secondary">j...mo@gmail.com</Typography>
											</Box>
										</Box>
									</Stack>
								</Grid>
							</Grid>
						</Card>
					</Grid>
				</Grid>
				<Grid xs={12} md={12} lg={12}>
					<Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap={`${lgDown ? 'wrap' : 'nowrap'}`} gap='10px'>
						<StyledTab style={{order: `${lgDown ? 2 : 1}`}}>
								<Box className={`tab ${tab === 'receivable' && 'active'}`} onClick={() => router.push('/milestones/receivable')}>
									<Typography>Receivale (3)</Typography>
								</Box>
								<Box className={`tab ${tab === 'payable' && 'active'}`} onClick={() => router.push('/milestones/payable')}>
									<Typography>Payable (3)</Typography>
								</Box>
						</StyledTab>
						<Stack direction="row" alignItems="center" flexWrap={`${lgDown ? 'wrap' : 'nowrap'}`} mb={1} sx={{order: `${lgDown ? 1 : 2}`, gap: '10px'}}>
							<TextField
								name="search"
								label="Search"
								placeholder='Search task...'
								value={status.searchText}
								onChange={e => setStatus({...status, searchText: e.target.value})}
								sx={{backgroundColor: 'white', borderRadius: '8px'}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
												<Iconify icon='mdi:search' />
										</InputAdornment>
									),
								}}
							/>
							<FormControl variant="filled" sx={{minWidth: lgDown ? 180 : 130, marginLeft: 0}}>
								<InputLabel id="sort-type">Payment</InputLabel>
								<Select
									labelId="sort-type"
									id="sort-type"
									value={status.selectedPaymentType}
									label="Sort Type"
									onChange={e => setStatus({...status, selectedPaymentType: e.target.value})}
									sx={{background: 'white'}}
								>
									<MenuItem value={'all'}>All Payments</MenuItem>
								</Select>
							</FormControl>
							<FormControl variant="filled" sx={{minWidth: lgDown ? 180 : 130}}>
								<InputLabel id="sort-type">Milestone</InputLabel>
								<Select
									labelId="sort-type"
									id="sort-type"
									value={status.selectedMilestoneType}
									label="Sort Type"
									onChange={e => setStatus({...status, selectedMilestoneType: e.target.value})}
									sx={{background: 'white'}}
								>
									<MenuItem value={'all'}>All Milestones</MenuItem>
								</Select>
							</FormControl>
						</Stack>
					</Stack>
					<Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20]}}>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <MilestoneTableHead
                    headLabel={[
                      { id: 'name', label: 'Name/Project' },
                      { id: 'date', label: 'Date'},
                      { id: 'pendingAmount', label: 'Pending'},
                      { id: 'paidAmount', label: 'Paid'},
                      { id: 'method', label: 'Method' },
                      { id: 'milestone', label: 'Milestone' },
                      { id: 'rate', label: 'Progress' },
                      { id: 'status', label: 'Status' },
                      { id: 'message', label: '' },
                    ]}
                  />
                  <TableBody>
                    {milestones
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: any) => (
                        <MilestoneTableRow
                          key={row.id}
                          name={row.name}
                          project={row.project}
                          status={row.status}
                          pendingAmount={row.pendingAmount}
                          paidAmount={row.paidAmount}
                          avatarUrl={row.avatarUrl}
                          date={row.date}
                          rate={row.rate}
                          milestone={row.milestone}
                          method={row.method}
													isUnreadMessage={row.isUnreadMessage}
                        />
                      ))}

                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, milestones.length)}
                    />

                    {!milestones.length && <TableNoData query={""} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              page={page}
              component="div"
              count={milestones.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
}

const StyledCarousel = styled.div`
	.react-multiple-carousel__arrow {
		background-color: transparent;
		&:before {
			color: #2b2929;
			font-size: 1.5rem;
			font-weight: 600;
		}
	}
`

const StyledTab = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1rem;
	margin-bottom: -16px;
	@media (max-width: 1200px) {
		margin-bottom: -8px;
	}
	@media (max-width: 576px) {
		width: 100%;
		.tab {
			width: calc(50% - 15px);
		}
	}
	.tab {
		background-color: #fefefe;
		color: #64748a;
		/* padding: 1.2rem 5rem; */
		display: flex;
		align-items: center;
		justify-content: center;
		width: 15rem;
		height: 4rem;
		cursor: pointer;
		border-radius: 8px 8px 0 0;
		transition: all 0.3s;
		&.active {
			background-color: white;
			color: black;
			z-index: 100;
		}
	}
`