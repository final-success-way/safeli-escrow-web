import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import styled from 'styled-components';

import { useRouter } from '@/routes/hooks/index';
import Iconify from '@/components/iconify';
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const router = useRouter();
  const theme = useTheme() as any;

  const [status, setStatus] = useState({
    email: '',
  })

  const handleClick = () => {
    router.push('/');
  };

  return (
    <Stack direction="column" justifyContent="space-between" sx={{minHeight: 'calc(100vh - 100px)'}}>
      <Box></Box>
      <Box>
        <Typography variant="h4" fontWeight='800'>Forgot password</Typography>
        <Typography mt='7px' fontSize='0.9rem' color='text.secondary'>Enter your email to receive a reset password link</Typography>
        <Stack spacing={3} sx={{mt: '30px'}}>
          <StyledInput>
            <TextField
              name="email"
              placeholder="Email"
              fullWidth
              value={status.email}
              onChange={e => setStatus({...status, email: e.target.value})}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                      <Iconify icon='mdi:email-outline' />
                  </InputAdornment>
                ),
              }}
            />
          </StyledInput>
        </Stack>
        <LoadingButton
          fullWidth size="large" onClick={handleClick}
          sx={{mt: '30px', backgroundColor: `${theme.palette.background.primary} !important`, color: 'white', padding: '15px 20px', borderRadius: '12px'}}
        >
          Continue
        </LoadingButton>
        <Stack direction="row" justifyContent='center' mt={'30px'}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            <Link href="/login" underline="none" color="text.primary"><b>Back to Sign In</b></Link>
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent='center'>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account? <Link href="/register" underline="none" color="text.primary"><b>Sing Up</b></Link>
        </Typography>
      </Stack>
    </Stack>
  );
}

const StyledInput = styled.div`
  width: 100%;
  input {
    font-weight: 800;
  }
  .Mui-focused {
    fieldset {
      border-color: #2b2929 !important;
    }
  }
`