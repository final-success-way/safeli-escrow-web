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

// ----------------------------------------------------------------------

export default function MilestonesView() {
  const lgDown = useResponsive('down', 'lg');
  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid lg={12} md={12} container spacing={3}>
          <Grid md={lgDown ? 4 : 3.5} sm={12}>
            <Card
              component={Stack} direction="column" justifyContent="space-between"
              sx={{px: 3, py: 5, borderRadius: 2, backgroundColor: '#2b2929', height: `${lgDown ? 'auto' : '100%'}`, position: 'relative', gap: '10px', zIndex: 1}}
            >
              <Typography fontSize='1.5rem' color='white' fontWeight='400' textAlign='center' zIndex={10}>Engage with confidence, secure payments for Hassle-free transactions and dispute resolution.</Typography>
              <Stack direction="row" justifyContent="center" zIndex={10}>
                <Button
                  variant="contained"
                  sx={{gap: '10px', padding: '10px 20px', maxWidth: '300px', color: 'text.primary', background: 'white !important'}}
                >
                  <Iconify icon="mdi:add-circle-outline" />
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
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, height: '100%'}}>
                <img src="/assets/icons/ic_pending.svg" alt="pending" style={{width: 50, height: 50}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Pending <b>84</b></Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h5">$1,234.00</Typography>
                      <Typography color="success.main"><b>+12%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, height: '100%'}}>
                <img src="/assets/icons/ic_completed.svg" alt="completed" style={{width: 50, height: 50}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Completed <b>205</b></Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h5">$10,566.01</Typography>
                      <Typography color="success.main"><b>+35%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} sx={{px: 3, py: 4, borderRadius: 2, height: '100%'}}>
                <Typography fontSize='0.9rem'>Total Receivable</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5">$1,234.00</Typography>
                  <Typography color="success.main"><b>+12%</b></Typography>
                </Stack>
                <SpartChart data = {[ 5, 20, 5, 18,22, 3, 12, 42, 12, 14, 10]} bgcolor='#54ba4a' width = {200} height = {40}/>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, height: '100%'}}>
                <img src="/assets/icons/ic_canceled.svg" alt="canceled" style={{width: 50, height: 50}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Canceled <b>25</b></Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h5">$956.00</Typography>
                      <Typography color="error.main"><b>-5%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} direction="row" alignItems="center" spacing={2} sx={{px: 3, py: 4, borderRadius: 2, height: '100%'}}>
                <img src="/assets/icons/ic_created.svg" alt="created" style={{width: 50, height: 50}} />
                <Box>
                    <Typography fontSize='0.9rem'>Milestones Created <b>314</b></Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="h5">$5,566.01</Typography>
                      <Typography color="success.main"><b>+15%</b></Typography>
                    </Stack>
                </Box>
              </Card>
            </Grid>
            <Grid lg={4} md={6} sm={6} xs={12}>
              <Card component={Stack} sx={{px: 3, py: 4, borderRadius: 2, height: '100%'}}>
                <Typography fontSize='0.9rem'>Total Receivable</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h5">$1,234.00</Typography>
                  <Typography color="success.main"><b>+12%</b></Typography>
                </Stack>
                <SpartChart data = {[ 5, 20, 5, 18,22, 3, 12, 42, 12, 14, 10]} bgcolor='#ee59a3' width = {200} height = {40}/>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={12} lg={12}>
        </Grid>
      </Grid>
    </Container>
  );
}
