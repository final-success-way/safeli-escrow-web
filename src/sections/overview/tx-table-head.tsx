import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import styled from 'styled-components';

// ----------------------------------------------------------------------

export default function TxTableHead({
  rowCount,
  headLabel,
  numSelected,
  onSelectAllClick,
}: any) {

  return (
    <TableHead className='table-head'>
      <TableRow>
        <TableCell padding="checkbox">
          <StyledCheckBox>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </StyledCheckBox>
        </TableCell>

        {headLabel.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TxTableHead.propTypes = {
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onSelectAllClick: PropTypes.func,
};

const StyledCheckBox = styled.div`
  .Mui-checked, .MuiCheckbox-indeterminate {
    .MuiSvgIcon-root {
      color: #2b2929 !important;
    }
  }
  .MuiSvgIcon-root {
    color: #e2e8f0;
  }
`