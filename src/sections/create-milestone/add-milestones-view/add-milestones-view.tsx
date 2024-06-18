import { useState } from 'react';

import Box from '@mui/material/Box';
import { Button, Card, Divider, Drawer, Grid, IconButton, Link, Stack, Typography, useTheme } from '@mui/material';
import useSocket from '@/context/use-socket';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from 'styled-components';
import Iconify from '@/components/iconify';
import AddMilestoneDrawer from './add-milestone-drawer';
import MilestoneStep from './milestone-step';

// ----------------------------------------------------------------------

const tempData = [
  { name: 'Milestone Name', amount: 0, desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop,', attachment: 'invoice_2024_05_15.pdf' },
  { name: 'Milestone Name', amount: 0, desc: 'We need you as a Frontend Developer to review our prototype and suggest improvements. This project is a responsive web application designed to run on a desktop,', attachment: 'invoice_2024_05_15.pdf' }
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2.5
  },
  tablet: {
    breakpoint: { max: 1024, min: 992 },
    items: 1.5
  },
  bigMobile: {
    breakpoint: { max: 992, min: 464 },
    items: 1.2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 0.8
  }
};

export default function AddMilestonesView (props: any) {
  const theme = useTheme() as any;
  const { update } = useSocket();

  const [status, setStatus] = useState({
    milestones: tempData,
    addDrawerOpen: false,
    totalMilestoneCount: 5
  })

  const onNext = () => {
    props.nextStep();
    update({createMilestoneStep: 4})
  }

  const onBack = () => {
    props.previousStep();
    update({createMilestoneStep: 2})
  }

  return (
    <Card sx={{ px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[20], width: '100%', minHeight: 'calc(100vh - 230px)'}}>
      <Box>
        <Stack direction='column' alignItems='center' spacing={0.5}>
          <Typography variant='h4'>Milestones</Typography>
          <Typography color='text.secondary' fontWeight={600}>Next step is to create as many milestones as you want!</Typography>
          <Box sx={{marginTop: '20px !important'}}>
            <MilestoneStep total={status.totalMilestoneCount} currentStep={status.milestones?.length + 1} />
          </Box>
        </Stack>
        <Box mt={5} mb={2}>
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={false}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="all 0.5s"
            transitionDuration={500}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop", "bigMobile", "superLargeDesktop"]}
            containerClass='carousel-container'
          >
            {status.milestones.map((i, k) => (
              <Card key={k} sx={{px: 3, py: 4, borderRadius: 2, boxShadow: theme.shadows[5], m: 1, userSelect: 'none', height: 'calc(100% - 15px)'}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                  <Typography variant='h5'>Milestone {k + 1}</Typography>
                  <Stack direction="row" alignItems="center">
                    <IconButton onClick={() => setStatus({...status, addDrawerOpen: true})}>
                      <img src="/assets/icons/ic_edit.svg" alt="edit" />
                    </IconButton>
                    <IconButton>
                      <img src="/assets/icons/ic_delete.svg" alt="delete" />
                    </IconButton>
                  </Stack>
                </Stack>
                <Divider sx={{my: 1}} />
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12} mt={1}>
                    <Typography variant='subtitle1'>Milestone{k + 1} Name</Typography>
                    <Typography color='text.secondary' fontSize='0.92rem' mt={0.5}>{i.name}</Typography>
                  </Grid>
                  <Grid item md={6} xs={12} mt={1}>
                    <Typography variant='subtitle1'>Phase{k + 1} Amount</Typography>
                    <Typography color='text.secondary' fontSize='0.92rem' mt={0.5}>$ {i.amount}</Typography>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <Typography variant='subtitle1'>Milestone{k + 1} Description</Typography>
                    <Typography color='text.secondary' fontSize='0.92rem' mt={0.5}>{i.desc}</Typography>
                  </Grid>
                  <Grid item xs={12} mt={1}>
                    <Typography variant='subtitle1'>Attachment</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Link href="" color='text.secondary' fontSize='0.92rem' mt={0.5}>{i.attachment}</Link>
                      <IconButton>
                        <Iconify icon="mdi:link-variant" />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            ))}
            <Card sx={{borderRadius: 2, boxShadow: theme.shadows[5], m: 1, userSelect: 'none', height: 'calc(100% - 15px)', minHeight: '300px'}}>
              <Button
                color='inherit' fullWidth
                onClick={() => setStatus({...status, addDrawerOpen: true})}
                sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}
              >
                <img src="/assets/icons/ic_add.svg" alt="add" style={{width: '6rem', height: 'auto'}} />
                <Typography variant='h6' color='text.secondary' mt={4}>Add Milestone</Typography>
              </Button>
            </Card>
          </Carousel>
        </Box>
        <Grid container sx={{width: '100%', maxWidth: 800, margin: '0 auto'}} spacing={2}>
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
        <AddMilestoneDrawer
          isOpen={status.addDrawerOpen}
          onClose={() => setStatus({...status, addDrawerOpen: false})}
        />
      </Box>
    </Card>
  );
}