import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";

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

export default function AuthLayout() {
  
	return (
		<Box>
    <Grid spacing={0} container>
      <Grid item xs={12} md={6} lg={6} xl={6} className='md-hidden'>
        <Box sx={{backgroundColor: '#2B2929', height: '100vh', padding: '3rem'}}>
          <Box width="100%">
            <Stack direction="row" justifyContent="start" alignItems="center" gap="10px">
              <img alt="logo" src="/assets/logo.svg" style={{width: 50, height: 50}} />
              <Typography variant='h3' color='white'>Safeli</Typography>
            </Stack>
          </Box>
          <Box sx={{mt: '30px'}}>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={10000}
              keyBoardControl={true}
              customTransition="all 0.5s"
              transitionDuration={500}
              removeArrowOnDeviceType={["tablet", "mobile", "desktop", "superLargeDesktop"]}
            >
              {Array(3).fill(0).map((i, k) => (
                <Stack key={k} direction="column" justifyContent="center" alignItems="center" mb="50px">
                  <StyledImgBack>
                    <img alt="Illustration" src="/assets/Illustration.png" draggable={false} />
                    <Box className="big-circle"></Box>
                    <Box className="small-circle"></Box>
                  </StyledImgBack>
                  <Typography variant='h5' color="white" textAlign="center">Customizable Multipurpose Dashboard</Typography>
                  <Typography color="white" textAlign="center" sx={{mt: '10px'}}>Everything you need in an easily customizable dashboard.</Typography>
                </Stack>
              ))}
            </Carousel>
          </Box>
        </Box>
      </Grid>
      <Grid
        item xs={12} md={6} lg={6} xl={6}
        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}
      >
        <Box sx={{maxWidth: 450, width: '100%'}}>
						<Outlet />
        </Box>
      </Grid>
    </Grid>
  </Box>
	);
}

const StyledImgBack = styled.div`
  position: relative;
  padding: 5rem;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  .big-circle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(255, 255, 255, 0.06) -50%, rgba(255, 255, 255, 0) 100%);
    border-radius: 50%;
  }
  .small-circle {
    position: absolute;
    width: 80%;
    height: 80%;
    background: linear-gradient(rgba(255, 255, 255, 0.09) -50%, rgba(255, 255, 255, 0) 100%);
    border-radius: 50%;
  }
`