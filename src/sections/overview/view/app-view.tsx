import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Iconify from '@/components/iconify';
import SpartChart from '@/components/spark-chart';
import { useResponsive } from '@/hooks/use-responsive';
import Scrollbar from '@/components/scrollbar';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState } from 'react';
import { emptyRows } from '../utils';
import { transactions } from '@/_mock/transaction';
import { Table, TableBody, TableContainer, useTheme } from '@mui/material';
import TableEmptyRows from '../table-empty-rows';
import TableNoData from '../table-no-data';
import TxTableRow from '../tx-table-row';
import TxTableHead from '../tx-table-head';
import TxTableToolbar from '../tx-table-toolbar';
import TxVolume from '../tx-volume';
import { useRouter } from '@/routes/hooks';
// ----------------------------------------------------------------------

export default function AppView() {
  const theme = useTheme() as any;
  const lgDown = useResponsive('down', 'lg');
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<{
    txData: TransactionType[],
    txVolume: {
      labels: string[]
      data: number[]
    }
  }>({
    txData: [],
    txVolume: {
      labels: [],
      data: []
    }
  })

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = data.txData.map((n: any) => n.name);
      setSelected(newSelecteds as any);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [] as any[];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected as any);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getData = () => {
		try {
      const _labels = ['01/01/2003','02/01/2003','03/01/2003','04/01/2003','05/01/2003','06/01/2003','07/01/2003','08/01/2003','09/01/2003','10/01/2003','11/01/2003'];
      const _data= [44093, 15024, 40001, 60037, 2002, 40003, 20001, 40001, 50006, 60037, 70233.88];
			setData({
        ...data,
        txData: transactions,
        txVolume: {labels: _labels, data: _data}
      });
		} catch (error) {
			console.log('getData error: ', error)
		}
	}

	useEffect(() => {
		getData();
	}, [])

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid lg={12} md={12} container spacing={3}>
          <Grid md={lgDown ? 4 : 3.5} sm={12}>
            <Card
              component={Stack} direction="column" justifyContent="space-between"
              sx={{px: 3, py: 5, borderRadius: 2, backgroundColor: theme.palette.background.primary, height: `${lgDown ? 'auto' : '100%'}`, position: 'relative', gap: '10px', zIndex: 1}}
            >
              <Typography fontSize='1.5rem' color='white' fontWeight='400' textAlign='center' zIndex={10}>Engage with confidence, secure payments for Hassle-free transactions and dispute resolution.</Typography>
              <Stack direction="row" justifyContent="center" zIndex={10}>
                <Button
                  sx={{gap: '5px', padding: '0.9rem 2rem', borderRadius: '12px', maxWidth: '300px', color: 'text.primary', background: 'white !important', marginTop: '20px'}}
                  onClick={() => router.push('/milestones/create')}
                >
                  <Iconify icon="mdi:add-circle-outline" width={26} />
                  <Typography><b>Create Milestone</b></Typography>
                </Button>
              </Stack>
              <Box sx={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}>
                <img src="/assets/wave.svg" alt="wave" style={{height: '100%', width: 'auto'}}/>
              </Box>
            </Card>
          </Grid>
          <Grid md={lgDown ? 8 : 8.5} sm={12} container spacing={3}>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%'}}>
                <img src="/assets/icons/ic_pending.svg" alt="pending" style={{width: 50, height: 50, maxWidth: '22%'}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Pending <b>{'84'}</b></Typography>
                    <Stack direction="row" alignItems="center" flexWrap='wrap' spacing={1}>
                      <Typography variant="h5">${'1,234.00'}</Typography>
                      <Typography color="success.main"><b>{'+12'}%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%'}}>
                <img src="/assets/icons/ic_completed.svg" alt="completed" style={{width: 50, height: 50, maxWidth: '22%'}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Completed <b>{'205'}</b></Typography>
                    <Stack direction="row" alignItems="center" flexWrap='wrap' spacing={1}>
                      <Typography variant="h5">${'10,566.01'}</Typography>
                      <Typography color="success.main"><b>{'+35'}%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%'}}>
                <Typography fontSize='0.9rem'>Total Receivable</Typography>
                <Stack direction="row" alignItems="center" flexWrap='wrap' spacing={1}>
                  <Typography variant="h5">${'1,234.00'}</Typography>
                  <Typography color="success.main"><b>{'+12'}%</b></Typography>
                </Stack>
                <SpartChart data = {[ 5, 20, 50, 181 ,22, 30, 12, 42, 12, 14, 10]} bgcolor='success' color='#54ba4a' width = {200} height = {40}/>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%'}}>
                <img src="/assets/icons/ic_canceled.svg" alt="canceled" style={{width: 50, height: 50, maxWidth: '22%'}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Canceled <b>{'25'}</b></Typography>
                    <Stack direction="row" alignItems="center" flexWrap='wrap' spacing={1}>
                      <Typography variant="h5">${'956.00'}</Typography>
                      <Typography color="error.main"><b>{'-5'}%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%'}}>
                <img src="/assets/icons/ic_created.svg" alt="created" style={{width: 50, height: 50, maxWidth: '22%'}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Created <b>{'314'}</b></Typography>
                    <Stack direction="row" alignItems="center" flexWrap='wrap' spacing={1}>
                      <Typography variant="h5">${'5,566.01'}</Typography>
                      <Typography color="success.main"><b>{'+15'}%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], height: '100%'}}>
                <Typography fontSize='0.9rem'>Total Receivable</Typography>
                <Stack direction="row" alignItems="center" flexWrap='wrap' spacing={1}>
                  <Typography variant="h5">${'1,234.00'}</Typography>
                  <Typography color="success.main"><b>{'+12'}%</b></Typography>
                </Stack>
                <SpartChart data = {[ 10, 80, 52, 18,22, 10, 12, 42, 12, 14, 10]} bgcolor='danger' color={theme.palette.error.light} width = {200} height = {40}/>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <TxVolume
            title="Transaction Volume"
            subheader=""
            chart={{
              labels: data.txVolume.labels,
              series: [{type: 'area', fill: 'gradient', name: '', data: data.txVolume.data}],
              options: {
                yaxis: {
                  labels: {
                    formatter: function (value: any) {
                      return value > 1e3 ? `${Math.round(value / 1e3)}K` : value;
                    }
                  }
                }
              }
            }}
          />
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <Card sx={{boxShadow: theme.shadows[20]}}>
            <TxTableToolbar numSelected={selected.length}/>

            <Box sx={{padding: '0 1rem'}}>
              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <TxTableHead
                      rowCount={data.txData.length}
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'name', label: 'Name/Project' },
                        { id: 'amount', label: 'Amount', align: 'center' },
                        { id: 'date', label: 'Date Sent' },
                        { id: 'rate', label: 'Progress Rate' },
                        { id: 'status', label: 'Status', align: 'right' },
                      ]}
                    />
                    <TableBody>
                      {data.txData
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row: any) => (
                          <TxTableRow
                            key={row.id}
                            name={row.name}
                            project={row.project}
                            status={row.status}
                            amount={row.amount}
                            avatarUrl={row.avatarUrl}
                            date={row.date}
                            rate={row.rate}
                            selected={selected.indexOf(row.name) !== -1}
                            handleClick={(event) => handleClick(event, row.name)}
                          />
                        ))}

                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, data.txData.length)}
                      />

                      {!data.txData.length && <TableNoData query={""} />}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                page={page}
                component="div"
                count={data.txData.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}