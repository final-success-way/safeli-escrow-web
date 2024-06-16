import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '@/routes/hooks/index';
import Iconify from '@/components/iconify';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";

import { grey } from '@/theme/palette';
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export default function VerifyEmailView() {
  const theme = useTheme();

  const router = useRouter();

  const [status, setStatus] = useState({
    email: '',
    password: '',
    passwordMsg: '',
    showPassword: false
  })

  const handleClick = () => {
    router.push('/dashboard');
  };

  const handleResend = () => {

  };

  return (
    <Box>
      <Typography variant="h4" fontWeight='800'>Verify your Email</Typography>
      <Typography mt='15px' fontSize='0.9rem' color='text.secondary'>We’ve sent a 4-digit  code to jonmassimo@gmail.com, enter it below. You only need to do this once.</Typography>
      <Typography mt='15px' fontSize='0.9rem' color='text.secondary'>
        Not the correct email? <Link href="/register" underline='none' color="text.primary"><b>Change email address</b></Link>
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={3} sx={{mt: '40px'}}>
        <OutlinedInput type='numer' sx={{width: '3.5rem', fontSize: '1.2rem'}} />
        <OutlinedInput type='numer' sx={{width: '3.5rem', fontSize: '1.2rem'}} />
        <OutlinedInput type='numer' sx={{width: '3.5rem', fontSize: '1.2rem'}} />
        <OutlinedInput type='numer' sx={{width: '3.5rem', fontSize: '1.2rem'}} />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{mt: '40px'}}
      >
        Skip now
      </LoadingButton>
      <Stack direction="row" justifyContent='start' mt={'30px'}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Didn’t receive OTP? 
        </Typography>
        <button
            style={{backgroundColor: 'transparent', border: '0', outline: 0, cursor: 'pointer'}}
            onClick={handleResend}
          >
          <Typography variant="body2"><b>Resend in 50s</b></Typography>
          </button>
      </Stack>
    </Box>
  );
}

const StyledCheckBox = styled.div`
  .MuiFormControlLabel-label {
    font-size: 1rem;
    font-weight: 600;
  }
`