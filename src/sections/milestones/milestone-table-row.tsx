import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from '@/components/label';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Badge, Box, IconButton, styled } from '@mui/material';
import Iconify from '@/components/iconify';
import Progress from '@/components/progress';

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

export default function MilestoneTableRow({
  name,
  project,
  avatarUrl,
  pendingAmount,
  paidAmount,
  method,
  milestone,
  rate,
  status,
  date,
  isUnreadMessage,
}: any) {

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Box>
              <Typography variant="subtitle2" noWrap>{name}</Typography>
              <Typography fontSize='0.9rem' noWrap>{project}</Typography>
            </Box>
          </Stack>
        </TableCell>

        <TableCell sx={{minWidth: '10rem'}}>
          <Typography color='text.secondary' fontSize='0.9rem'>{date.toDateString() || ''}</Typography>
        </TableCell>

        <TableCell align="left">
          <Typography variant='subtitle1'>${pendingAmount}</Typography>
        </TableCell>

        <TableCell align="left">
          <Typography variant='subtitle1'>${paidAmount}</Typography>
        </TableCell>

        <TableCell align="left">
          <Typography variant='subtitle1'>
            <img src={`/assets/${method === 'mastercard' ? 'mastercard.png' : (method === 'visa' ? 'visa.png' : 'paypal.png')}`} alt={method} style={{maxWidth: '100%', maxHeight: '100%'}} />
          </Typography>
        </TableCell>

        <TableCell align="left">
          <Box sx={{backgroundColor: '#64748b', padding: '4px 10px', borderRadius: '10px', display: 'inline-block'}}>
            <Typography color='white' fontSize='0.9rem' sx={{textTransform: 'capitalize'}}>{milestone}</Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Progress value={rate * 100} />
        </TableCell>

        <TableCell>
          <Label
            color={(status === 'complete' ? 'success' : (status === 'awaiting' ? 'warning' : 'error'))}
            startIcon={<Iconify icon="mdi:dot" width={20} />}
            iconSize={20}
          >
            {status}
          </Label>
        </TableCell>

        <TableCell>
          <IconButton color={'default'} /* onClick={handleOpen} */ sx={{padding: '5px'}}>
            <Badge variant='dot' color="error" invisible={!isUnreadMessage}>
              <img src="/assets/icons/navbar/ic_message.svg" alt="ic_message" style={{width: 26, height: 26}} />
            </Badge>
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

MilestoneTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  project: PropTypes.any,
  pendingAmount: PropTypes.any,
  paidAmount: PropTypes.any,
  method: PropTypes.any,
  milestone: PropTypes.any,
  name: PropTypes.any,
  rate: PropTypes.any,
  date: PropTypes.any,
  isUnreadMessage: PropTypes.any,
  status: PropTypes.string,
};
