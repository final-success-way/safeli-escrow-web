import { useState } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from '@/hooks/use-responsive';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Ticket',
    icon: '/assets/icons/ic_ticket',
  },
  {
    label: 'APIs',
    icon: '/assets/icons/ic_api',
  },
  {
    label: 'Settings',
    icon: '/assets/icons/ic_settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const mdUp = useResponsive('up', 'md');
  
  const [open, setOpen] = useState(null);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <IconButton color={'default'} onClick={e => !mdUp && handleOpen(e)} sx={{padding: '5px'}}>
          <img src="/assets/icons/ic_profile.svg" alt="ic_profile" style={{width: 26, height: 26}} />
        </IconButton>
        {mdUp && (
          <Typography fontSize='0.8rem' color='text.primary'>Profile</Typography>
        )}
      </Box>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
