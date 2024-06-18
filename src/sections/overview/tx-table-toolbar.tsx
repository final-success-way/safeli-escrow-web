import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

// ----------------------------------------------------------------------

export default function TxTableToolbar({ numSelected }: any) {

  const [status, setStatus] = useState({
    selectedSortType: 'recent'
  })

  return (
    <StyledTableToolbar>
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
              <img src="/assets/icons/ic_delete.svg" alt="delete" style={{width: 22, height: 22}} />
            </IconButton>
          </Tooltip>
        ) : (
          <StyledSelect>
            <Select
              labelId="sort-type"
              id="sort-type"
              value={status.selectedSortType}
              onChange={e => setStatus({...status, selectedSortType: e.target.value})}
              IconComponent={ExpandMoreIcon}
            >
              <MenuItem value={'recent'}>Sort by: <b>Recent</b></MenuItem>
              <MenuItem value={'toppest'}>Sort by: <b>Toppest</b></MenuItem>
            </Select>
          </StyledSelect>
        )}
      </Toolbar>
    </StyledTableToolbar>
  );
}

TxTableToolbar.propTypes = {
  numSelected: PropTypes.number
};

const StyledTableToolbar = styled.div`
  .css-e1ke4r-MuiToolbar-root {
    background-color: #f8fafc;
  }
  .css-e1ke4r-MuiToolbar-root {
    color: #212B36;
  }
`

const StyledSelect = styled.div`
  > div {
    > div {
      padding: 10px 15px;
    }
  }
`