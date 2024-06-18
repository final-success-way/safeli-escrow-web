import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Grid, useTheme } from '@mui/material';
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
  const theme = useTheme() as any;
	return (
		<Box>
    <Grid spacing={0} container>
      <Grid item xs={12} md={6} lg={6} xl={6} className='md-hidden'>
        <Box sx={{backgroundColor: '#2B2929', height: '100vh', padding: '3rem'}}>
          <Box width="100%">
            <Stack direction="row" justifyContent="start" alignItems="center" gap="15px">
              <img alt="logo" src="/assets/logo.svg" style={{width: 50, height: 50}} />
              <Typography variant='h3' color='white'>Safeli</Typography>
            </Stack>
          </Box>
          <StyledCarousel style={{marginTop: '30px', minHeight: 'calc(100vh - 200px)'}}>
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
                  <Typography variant='h4' color="white" textAlign="center">Customizable Multipurpose Dashboard</Typography>
                  <Typography color="#bbbbbc" fontSize="0.9rem" textAlign="center" sx={{mt: '10px'}}>Everything you need in an easily customizable dashboard.</Typography>
                </Stack>
              ))}
            </Carousel>
          </StyledCarousel>
        </Box>
      </Grid>
      <Grid
        item xs={12} md={6} lg={6} xl={6}
        sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}
      >
        <Box sx={{maxWidth: 480, width: '100%', padding: '10px'}}>
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
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
  }
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
    width: 72%;
    height: 72%;
    background: linear-gradient(rgba(255, 255, 255, 0.09) -50%, rgba(255, 255, 255, 0) 100%);
    border-radius: 50%;
  }
`

const StyledCarousel = styled.div`
  .react-multi-carousel-dot--active button {
    background-color: white !important;
    border-color: transparent;
  }
  .react-multi-carousel-dot button {
    background-color: #555454;
    border-color: transparent;
    width: 10px;
    height: 10px;
    margin-right: 0.9rem;
  }
  .react-multi-carousel-list {
    height: calc(100vh - 200px);
  }
`