import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from '@/components/label';
import { Badge, Box, IconButton } from '@mui/material';
import Iconify from '@/components/iconify';
import Progress from '@/components/progress';
import styled from 'styled-components';
import { useRouter } from '@/routes/hooks';

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
  const router = useRouter();
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" onClick={() => router.push('/milestones/387D4')} sx={{cursor: 'pointer'}}>
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
          <Label color={(status === 'complete' ? 'success' : (status === 'awaiting' ? 'warning' : 'error'))}>
            <Stack direction="row" alignItems="center" gap="2px">
              <span style={{fontSize: '1.5rem', lineHeight: 1, marginBottom: '3px'}}>•</span>
              <Typography fontSize='0.9rem' lineHeight={1}>{status}</Typography>
            </Stack>
          </Label>
        </TableCell>

        <TableCell>
          <IconButton color={'default'} /* onClick={handleOpen} */ sx={{padding: '5px'}}>
            <StyledBadge style={{flexShrink: 0}}>
              <Badge variant='dot' color="error" invisible={!isUnreadMessage}>
                <img src="/assets/icons/navbar/ic_message.svg" alt="ic_message" style={{width: 30, height: 30}} />
              </Badge>
            </StyledBadge>
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


const StyledBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
	.MuiBadge-badge {
    top: 7px;
    right: 7px;
  }
`