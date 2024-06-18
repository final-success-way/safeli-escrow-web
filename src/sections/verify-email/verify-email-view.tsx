import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTheme } from '@mui/material/styles';

import { useRouter } from '@/routes/hooks/index';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export default function VerifyEmailView() {
  const theme = useTheme() as any;

  const router = useRouter();

  const [status, setStatus] = useState({
    code: ['', '', '', ''],
  })

  const handleClick = () => {
    router.push('/');
  };

  const handleResend = () => {

  };

  const onCodeChange = (value: string, index: number) => {
    if (value.length >= 2) return;
    const _code = status.code;
    setStatus({...status, code: [..._code.slice(0, index), value, ..._code.slice(index+1)]})
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight='800'>Verify your Email</Typography>
      <Typography mt='15px' fontSize='0.9rem' color='text.secondary'>We’ve sent a 4-digit  code to jonmassimo@gmail.com, enter it below. You only need to do this once.</Typography>
      <Typography mt='15px' fontSize='0.9rem' color='text.secondary'>
        Not the correct email? <Link href="/register" underline='none' color="text.primary"><b>Change email address</b></Link>
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={3} sx={{mt: '40px'}}>
        {Array(4).fill(0).map((i, k) => (
          <StyledCodeInput>
            <OutlinedInput
              type='text' sx={{width: '4rem', fontSize: '1.2rem', textAlign: 'center'}}
              onChange={e => onCodeChange(e.target.value, k)}
              value={status.code?.[k] || ''}
            />
          </StyledCodeInput>
        ))}
      </Stack>
      <LoadingButton
        fullWidth size="large" onClick={handleClick}
        sx={{mt: '40px', backgroundColor: `${theme.palette.background.primary} !important`, color: 'white', padding: '15px 20px', borderRadius: '12px'}}
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

const StyledCodeInput = styled.div`
  input {
    font-weight: 800;
    text-align: center;
  }
  .Mui-focused {
    fieldset {
      border-color: #2b2929 !important;
    }
  }
`