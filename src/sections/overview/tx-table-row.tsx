import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from '@/components/label';
import Iconify from '@/components/iconify';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box, styled } from '@mui/material';
import styledComponent from 'styled-components';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#39cef9' : '#308fe8',
  },
}));


// ----------------------------------------------------------------------

export default function TxTableRow({
  selected,
  name,
  project,
  avatarUrl,
  amount,
  date,
  rate,
  status,
  handleClick,
}: any) {

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <StyledCheckBox>
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </StyledCheckBox>
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <img src={avatarUrl} alt={name} style={{width: 32, height: 32, borderRadius: '6px'}} />
            <Box>
              <Typography variant="subtitle2" noWrap>{name}</Typography>
              <Typography fontSize='0.9rem' noWrap>{project}</Typography>
            </Box>
          </Stack>
        </TableCell>

        <TableCell align="center">
          <Typography variant='subtitle1'>${amount}</Typography>
        </TableCell>

        <TableCell>
          <Typography color='text.secondary' fontSize='0.9rem'>{date?.toDateString() || ''}</Typography>
        </TableCell>

        <TableCell sx={{width: '10rem'}}>
          <Typography color="text.secondary" fontSize='0.9rem' textAlign='center'><b>{Math.round(rate * 1e2)}</b>%</Typography>
          <BorderLinearProgress variant="determinate" value={rate * 1e2} />
        </TableCell>

        <TableCell align='right'>
          <Label color={(status === 'sent' ? 'success' : (status === 'pending' ? 'warning' : 'error'))}>
            <Typography fontSize='0.9rem'>{status}</Typography>
          </Label>
        </TableCell>
      </TableRow>
    </>
  );
}

TxTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  project: PropTypes.any,
  handleClick: PropTypes.func,
  amount: PropTypes.any,
  name: PropTypes.any,
  rate: PropTypes.any,
  date: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

const StyledCheckBox = styledComponent.div`
  .Mui-checked {
    .MuiSvgIcon-root {
      color: #2b2929 !important;
    }
  }
  .MuiSvgIcon-root {
    color: #e2e8f0;
  }
`