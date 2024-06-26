import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function MilestoneTableHead({
  headLabel,
}: any) {
  
  return (
    <TableHead>
      <TableRow>
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

MilestoneTableHead.propTypes = {
  headLabel: PropTypes.array,
};
