import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button, Card, FormControlLabel, Grid, Radio, Stack, Typography, useTheme } from '@mui/material';
import useSocket from '@/context/use-socket';
import { BpCheckedIcon, BpIcon } from './select-milestone-type-view';
import { MarkdownEditor } from '@/components/markdown/markdown';
import MilestoneStep from './add-milestones-view/milestone-step';

// ----------------------------------------------------------------------

export default function AddContractView(props: any) {
  const theme = useTheme() as any;
  const { update } = useSocket();

  const [status, setStatus] = useState({
    selecteType: 'auto-generated',
    content: '',
    totalMilestoneCount: 5,
    addedMilestoneCount: 3
  })

  const onNext = () => {
    props.nextStep();
    update({createMilestoneStep: 5})
  }

  const onBack = () => {
    props.previousStep();
    update({createMilestoneStep: 3})
  }

  return (
    <Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], width: '100%', minHeight: 'calc(100vh - 230px)'}}>
      <Stack direction="column" alignItems="center" spacing={3} maxWidth={800} margin='0 auto'>
        <Stack direction='column' alignItems='center' spacing={0.5}>
          <Typography variant='h4'>Contract</Typography>
          <Typography color='text.secondary' fontWeight={600}>Next step is to create as many milestones as you want!</Typography>
          <Box sx={{mt: '20px !important'}}>
            <MilestoneStep total={status.totalMilestoneCount} currentStep={status.addedMilestoneCount} />
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" flexWrap='wrap' gap={1}>
          <FormControlLabel
            value="auto-generated"
            control={ <Radio checked={status.selecteType === 'auto-generated'} name="contract-type" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} /> }
            label="Use Auto Generated Contract"
            onClick={() => setStatus({...status, selecteType: 'auto-generated'})}
          />
          <FormControlLabel
            value="upload"
            control={ <Radio checked={status.selecteType === 'upload'} name="contract-type" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />}/> }
            label="Upload Custom Contract"
            onClick={() => setStatus({...status, selecteType: 'upload'})}
          />
          <FormControlLabel
            value="use-template"
            control={ <Radio checked={status.selecteType === 'use-template'} name="contract-type" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} /> }
            label="Use a Template"
            onClick={() => setStatus({...status, selecteType: 'use-template'})}
          />
        </Stack>
        <Box sx={{width: '100%'}}>
          <MarkdownEditor text={status.content} onChange={(text) => setStatus({...status, content: text})} style={{ height: 300, width: '100%' }} />
        </Box>
        <Stack direction="row" alignItems="center" sx={{width: '100%', gap: 2, mt: 1}}>
          <Grid container sx={{width: '100%'}} spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          <Button
            sx={{backgroundColor: `${theme.palette.success.main} !important`, padding: '12px', flexShrink: 0, borderRadius: '12px'}}
            onClick={() => {}}
          >
            <img src="/assets/icons/ic_file.svg" alt="file" style={{width: 30, height: 30}} />
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}