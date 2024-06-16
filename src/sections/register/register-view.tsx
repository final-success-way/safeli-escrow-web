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

export default function RegisterView() {
  const theme = useTheme();

  const router = useRouter();

  const [status, setStatus] = useState({
    username: '',
    email: '',
    password: '',
    passwordMsg: '',
    showPassword: false
  })

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight='800'>Sign Up for an Account</Typography>
      <Stack spacing={3} sx={{mt: '40px'}}>
        <TextField
          name="username"
          label="Username"
          value={status.username}
          onChange={e => setStatus({...status, username: e.target.value})}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon='mdi:user-outline' />
              </InputAdornment>
            ),
          }}
        />
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
        <TextField
          error={status.passwordMsg !== ""}
          name="password"
          label="Password"
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
      </Stack>
      <Typography variant="body2" sx={{mt: '8px', color: 'text.secondary'}}>Your password must have at least 8 characters</Typography> 
      <StyledCheckBox>
        <FormControlLabel
          control={<Checkbox defaultChecked sx={{
            color: grey[800],
            '&.Mui-checked': {
              color: grey[800],
            },
          }}
          />}
          label="By creating an account means you agree to the Terms & Conditions and our Privacy Policy"
          sx={{
            mt: '20px',
            color: 'text.primary'
          }}
        />
      </StyledCheckBox>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{mt: '30px'}}
      >
        Sign Up
      </LoadingButton>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Or sign up with</Typography>
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
      <Stack direction="row" justifyContent='center' mt={'20px'}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Already have an account? <Link href="/login" underline="none" color="text.primary"><b>Log In</b></Link>
        </Typography>
      </Stack>
    </Box>
  );
}

const StyledCheckBox = styled.div`
  .MuiFormControlLabel-label {
    font-size: 0.85rem;
  }
`