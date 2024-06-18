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

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme() as any;

  const router = useRouter();

  const [status, setStatus] = useState({
    email: '',
    password: '',
    passwordMsg: '',
    showPassword: false
  })

  const handleClick = () => {
    router.push('/');
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight='800px'>Sign In to your Account</Typography>
      <Typography mt='7px' fontSize='0.9rem' color='text.secondary'>Welcome back! please enter your detail</Typography>
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
        <StyledInput>
          <TextField
            error={status.passwordMsg !== ""}
            name="password"
            placeholder="Password"
            fullWidth
            type={status.showPassword ? 'text' : 'password'}
            value={status.password}
            onChange={e => setStatus({...status, password: e.target.value, passwordMsg: ''})}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <Iconify icon='mdi:password-outline' />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setStatus({...status, showPassword: !status.showPassword})} edge="end">
                    <Iconify icon={status.showPassword ? 'eva:eye-outline' : 'eva:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </StyledInput>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap="10px" mt="20px">
        <StyledCheckBox>
          <FormControlLabel
            control={<Checkbox defaultChecked sx={{
              color: grey[800],
              '&.Mui-checked': {
                color: grey[800],
              },
            }}
            />}
            label="Remember me"
            sx={{color: 'text.primary'}}
          />
        </StyledCheckBox>
        <Link href="/forgot-password" color="text.primary" underline='none'><b>Forgot Password?</b></Link>
      </Stack>
      <LoadingButton
        fullWidth size="large" onClick={handleClick}
        sx={{mt: '20px', backgroundColor: `${theme.palette.background.primary} !important`, color: 'white', padding: '15px 20px', borderRadius: '12px'}}
      >
        Sign In
      </LoadingButton>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Or sign in with</Typography>
      </Divider>
      <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), display: 'flex', gap: '10px'}}
        >
          <img alt="google" src="/assets/icons/google.svg" style={{width: 20, height: 20}} />
          <Typography variant="subtitle2">Google</Typography>
        </Button>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), display: 'flex', gap: '10px'}}
        >
          <img alt="facebook" src="/assets/icons/facebook.svg" style={{width: 20, height: 20}} />
          <Typography variant="subtitle2">Facebook</Typography>
        </Button>
      </Stack>
      <Stack direction="row" justifyContent='center' mt={'30px'}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Don’t have an account? <Link href="/register" underline="none" color="text.primary"><b>Sing Up</b></Link>
        </Typography>
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