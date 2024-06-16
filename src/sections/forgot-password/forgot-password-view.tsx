import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '@/routes/hooks/index';
import Iconify from '@/components/iconify';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
  const theme = useTheme();

  const router = useRouter();

  const [status, setStatus] = useState({
    email: '',
  })

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight='800'>Forgot password</Typography>
      <Typography mt='7px' fontSize='0.9rem' color='text.secondary'>Enter your email to receive a reset password link</Typography>
      <Stack spacing={3} sx={{mt: '40px'}}>
        <TextField
          name="email"
          label="Email"
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
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{mt: '30px'}}
      >
        Continue
      </LoadingButton>
      <Stack direction="row" justifyContent='center' mt={'30px'}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Link href="/login" underline="none" color="text.primary"><b>Back to Sign In</b></Link>
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent='center' mt={'50px'}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account? <Link href="/register" underline="none" color="text.primary"><b>Sing Up</b></Link>
        </Typography>
      </Stack>
    </Box>
  );
}