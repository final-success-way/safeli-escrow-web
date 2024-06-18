import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button, Card, Container, Grid, Radio, Stack, Typography, useTheme } from '@mui/material';
import styled from 'styled-components';
import useSocket from '@/context/use-socket';

// ----------------------------------------------------------------------

export const BpIcon = styled('span')({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow:'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
});

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#2b2929',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#1c1b1b',
  },
});


export default function SelectMilestoneTypeView(props: any) {
  const { update } = useSocket();
  const theme = useTheme() as any;

  const [status, setStatus] = useState({
    selectedType: ''
  })

  const onNext = () => {  
    props.nextStep();
    update({createMilestoneStep: 2})
  }

  return (
    <Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], width: '100%', minHeight: 'calc(100vh - 230px)'}}>
      <Stack direction="column" alignItems="center" spacing={3} maxWidth={500} margin='0 auto'>
        <Stack direction='column' alignItems='center' spacing={0.5}>
          <Typography variant='h4'>Create New Milestone</Typography>
          <Typography color='text.secondary' fontWeight='600'>Select an appropriate milestone type to begin with</Typography>
        </Stack>
        <StyledRadioBtn className={`${status.selectedType === 'fixed' ? 'active' : ''}`} onClick={() => setStatus({...status, selectedType: 'fixed'})}>
          <Stack direction="row" spacing={0.5} flexShrink={0}>
            <Box sx={{flexShrink: 0, display: 'flex', alignItems: 'center'}}>
              <Radio
                checked={status.selectedType === 'fixed'}
                value="fixed"
                name="milestone-type"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
              />
            </Box>
            <img src="/assets/icons/ic_created.svg" alt="ic_created" style={{width: '3.5rem', height: 'auto'}} />
          </Stack>
          <Box>
            <Typography variant='h6'>Pay Fixed Price</Typography>
            <Typography color='text.secondary' fontSize='0.9rem'>Set a definite price before work begins, then pay after delivery.</Typography>
          </Box>
        </StyledRadioBtn>
        <StyledRadioBtn className={`${status.selectedType === 'hourly' ? 'active' : ''}`} onClick={() => setStatus({...status, selectedType: 'hourly'})}>
          <Stack direction="row" spacing={0.5} flexShrink={0}>
            <Box sx={{flexShrink: 0, display: 'flex', alignItems: 'center'}}>
              <Radio
                checked={status.selectedType === 'hourly'}
                value="hourly"
                name="milestone-type"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
              />
            </Box>
            <img src="/assets/icons/ic_time.svg" alt="ic_time" style={{width: '3.5rem', height: 'auto'}} />
          </Stack>
          <Box>
            <Typography variant='h6'>Pay Per hour</Typography>
            <Typography color='text.secondary' fontSize='0.9rem'>Compensate based on time spent working on your project.</Typography>
          </Box>
        </StyledRadioBtn>
        <Grid container sx={{width: '100%'}}>
          <Grid item xs={12} mt={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: `${theme.palette.background.primary} !important`, padding: '12px 20px', fontSize: '1rem', width: '100%', border: `1px solid ${theme.palette.background.primary}`, borderRadius: '12px'
              }}
              onClick={onNext}
            >
              Proceed
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

const StyledRadioBtn = styled.div`
  background-color: transparent;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #f8fafc;
  }
  &.active {
    border-color: #2b2929;
  }
`