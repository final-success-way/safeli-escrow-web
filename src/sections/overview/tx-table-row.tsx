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
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
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
          <Typography color="text.primary" fontSize='0.9rem' textAlign='center'>{Math.round(rate * 1e2)}%</Typography>
          <BorderLinearProgress variant="determinate" value={rate * 1e2} />
        </TableCell>

        <TableCell align='right'>
          <Label color={(status === 'sent' ? 'success' : (status === 'pending' ? 'primary' : 'error'))}>{status}</Label>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
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
