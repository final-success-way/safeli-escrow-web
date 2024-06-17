import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button, Card, Divider, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import useSocket from '@/context/use-socket';
import Label from '@/components/label';
import { copyToClipboard } from '@/context/helper';
import { useRouter } from '@/routes/hooks';
import Iconify from '@/components/iconify';
import Progress from '@/components/progress';

// ----------------------------------------------------------------------

const tempData = {
  from: 'Jon Massimo',
  fromComapny: 'MO Global',
  to: 'Matthew Olamide',
  date: new Date(),
  phases: '4 Milestones (72 Hours)',
  status: 'new',
  contractId: '387D4',
  amount: 15000,
  totalAmount: 15800,
  progress: 0.3,
  url: 'https://www.safeli.io/jon-massimo/xP5LGLZ70R7ZDlO3/contract?387D4'
}

export default function ReviewView(props: any) {
  const theme = useTheme() as any;
  const { update } = useSocket();
  const router = useRouter();

  const [status, setStatus] = useState({
    data: tempData
  })

  const onNext = () => {
    update({createMilestoneStep: 0});
    router.push('/milestones/387D4');
  }

  const onBack = () => {
    props.previousStep();
    update({createMilestoneStep: 4})
  }

  return (
    <Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], width: '100%', minHeight: 'calc(100vh - 230px)'}}>
      <Stack direction="column" alignItems="center" spacing={2} maxWidth={800} margin='0 auto'>
        <Stack direction='column' alignItems='center' spacing={0.5}>
          <Typography variant='h4'>Review</Typography>
          <Typography color='text.secondary'>Next step is to select a funding source proceed to make payments</Typography>
        </Stack>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>From</Typography>
            <Typography variant='subtitle1' mt={0.5}>{status.data?.from} <span style={{fontWeight: 400, color: theme.palette.text.secondary}}>({status.data?.fromComapny})</span></Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>To</Typography>
            <Typography variant='subtitle1' mt={0.5}>{status.data?.to}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Issued Date</Typography>
            <Typography variant='subtitle1' mt={0.5}>{status.data?.date?.toDateString()}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Phases</Typography>
            <Typography variant='subtitle1' mt={0.5}>{status.data?.phases}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Milestone Status</Typography>
            <Label mt={0.5}>{status.data?.status}</Label>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Contract ID</Typography>
            <Typography variant='subtitle1' mt={0.5}>#{status.data?.contractId}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Milestone Amount</Typography>
            <Typography variant='subtitle1' mt={0.5}>${status.data?.amount}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Milestone Progress</Typography>
            <Progress value={status.data?.progress * 100} />
          </Grid>
          <Grid item xs={12} mt={2}>
            <Divider />
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Total Amount + Taxes</Typography>
            <Typography variant='h3' mt={0.5}>${status.data?.totalAmount}</Typography>
          </Grid>
          <Grid item sm={6} xs={12} mt={2}>
            <Typography color='text.secondary'>Status</Typography>
            <Label
              color="warning" mt={0.5}
              startIcon={<Iconify icon="mdi:dot" width={20} />}
              iconSize={20} 
            >
              Awaiting
            </Label>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography color='text.secondary'>Unique Url</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography mt={0.5}>{status.data?.url}</Typography>
              <IconButton onClick={() => copyToClipboard(status.data?.url)}>
                <img src="/assets/icons/ic_copy.svg" alt="copy" style={{width: 18, height: 'auto'}} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Grid container sx={{width: '100%'}} spacing={2}>
          <Grid item xs={6} mt={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: `${theme.palette.background.gray} !important`, padding: '12px 20px', fontSize: '1rem', width: '100%', color: 'text.primary', border: '1px solid #dbe0e6'
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
                backgroundColor: `${theme.palette.background.primary} !important`, padding: '12px 20px', fontSize: '1rem', width: '100%', border: `1px solid ${theme.palette.background.primary}`
              }}
              onClick={onNext}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}