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
  const theme = useTheme() as any;

  const router = useRouter();

  const [status, setStatus] = useState({
    username: '',
    email: '',
    password: '',
    passwordMsg: '',
    showPassword: false
  })

  const handleClick = () => {
    router.push('/');
  };

  const checkPassword = (pass: string) => {
    let errorMsg = "";
    if (!!pass) {
      errorMsg = "Your password is not strong enough. Use at least 8 characters";
    }
    return errorMsg;
  }

  const onPasswordChange = (value: string) => {
    const erroMsg = checkPassword(value);
    setStatus({...status, password: value, passwordMsg: erroMsg});
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={'700 !important'}>Sign Up for an Account</Typography>
      <Stack spacing={2} sx={{mt: '25px'}}>
        <StyledInput>
          <TextField
            name="username"
            placeholder='Username'
            fullWidth
            value={status.username}
            onChange={e => setStatus({...status, username: e.target.value})}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon='mingcute:user-2-line' />
                </InputAdornment>
              ),
            }}
          />
        </StyledInput>
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
            onChange={e => onPasswordChange(e.target.value)}
            
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
      {!!status.passwordMsg ? (
        <Stack direction="row" alignItems="center" gap={1} mt={'15px'} sx={{color: theme.palette.error.light}}>
          <Iconify icon="mingcute:warning-line" />
          <Typography variant="body2" sx={{fontWeight: 600}}>{status.passwordMsg}</Typography>
        </Stack>
      ) : (
        <Typography variant="body2" sx={{mt: '15px', color: 'text.secondary'}}>Your password must have at least 8 characters</Typography> 
      )}
      <StyledCheckBox>
        <FormControlLabel
          control={<Checkbox defaultChecked sx={{
            color: grey[800],
            '&.Mui-checked': {
              color: grey[800],
            },
          }}
          />}
          label={
            <Typography color={theme.palette.text.secondary} fontSize='0.9rem'>
              By creating an account means you agree to the
              <b style={{color: theme.palette.text.primary}}> Terms & Conditions </b>
              and our <b style={{color: theme.palette.text.primary}}> Privacy Policy</b>
            </Typography>
          }
          sx={{
            mt: '20px',
            color: 'text.primary'
          }}
        />
      </StyledCheckBox>
      <LoadingButton
        fullWidth size="large" onClick={handleClick}
        sx={{mt: '30px', backgroundColor: `${theme.palette.background.primary} !important`, color: 'white', padding: '15px 20px', borderRadius: '12px'}}
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
      <Stack direction="row" justifyContent='center' mt={'30px'}>
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

const StyledInput = styled.div`
  width: 100%;
  input {
    font-weight: 800;
  }
  .Mui-focused {
    fieldset {
      border-color: #2b2929 !important;
    }
    .Mui-error {
      fieldset {
        border-color: #ed4f9d !important;
      }
    }
  }
  .Mui-error {
    fieldset {
      border-color: #ed4f9ed4 !important;
    }
  }
`