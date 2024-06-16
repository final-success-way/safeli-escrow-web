import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from '@/components/iconify';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function TxTableToolbar({ numSelected }: any) {

  const [status, setStatus] = useState({
    selectedSortType: ''
  })

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant='h6'>Transaction history</Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <FormControl sx={{minWidth: 180}}>
          <InputLabel id="sort-type">Sort Type</InputLabel>
          <Select
            labelId="sort-type"
            id="sort-type"
            value={status.selectedSortType}
            label="Sort Type"
            onChange={e => setStatus({...status, selectedSortType: e.target.value})}
          >
            <MenuItem value={'recent'}>Sort by: <b>Recent</b></MenuItem>
            <MenuItem value={'toppest'}>Sort by: <b>Toppest</b></MenuItem>
          </Select>
        </FormControl>
      )}
    </Toolbar>
  );
}

TxTableToolbar.propTypes = {
  numSelected: PropTypes.number
};