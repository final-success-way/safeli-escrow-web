import { useState } from 'react';
import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { faker } from '@faker-js/faker';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
import Stack from '@mui/material/Stack';
import { HEADER } from '../config-layout';
import { useResponsive } from '@/hooks/use-responsive';
import Label from '@/components/label';
import { useTheme } from '@mui/material';
import styled from 'styled-components';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.string.uuid(),
    title: 'Your order is placed',
    description: 'Transaction Complete: Your recent payment of $50...',
    avatar: '/assets/user.png',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: faker.person.fullName(),
    description: 'Transaction Complete: Your recent payment of $50...',
    avatar: '/assets/user.png',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.string.uuid(),
    title: 'You have new message',
    description: 'Transaction Complete: Your recent payment of $50...',
    avatar: '/assets/user.png',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: 'You have new mail',
    description: 'Transaction Complete: Your recent payment of $50...',
    avatar: '/assets/user.png',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.string.uuid(),
    title: 'Delivery processing',
    description: 'Transaction Complete: Your recent payment of $50...',
    avatar: '/assets/user.png',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover() {
  const mdUp = useResponsive('up', 'md');
  const theme = useTheme() as any;
  
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);
  const [status, setStatus] = useState({
    selectedTab: 'all' as 'all'|'unread'
  })

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <IconButton color={'default'} onClick={handleOpen} sx={{padding: '5px'}}>
          <StyledBadge>
            <Badge badgeContent={totalUnRead} color="error">
              <img src="/assets/icons/ic_notification.svg" alt="ic_notification" style={{width: 26, height: 26}} />
            </Badge>
          </StyledBadge>
        </IconButton>
        {mdUp && (
          <Typography fontSize='0.8rem' color={theme.palette.text.secondary}>Notification</Typography>
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
            mt: `15px`,
            ml: 0.75,
            width: 360,
            borderRadius: '20px'
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notification</Typography>
          </Box>

          <IconButton onClick={handleClose}>
            <Iconify icon="mdi:close" />
          </IconButton>
        </Box>

        <Divider sx={{ borderStyle: 'solid' }} />

        <Stack direction="row" alignItems="center" gap={1} sx={{pt: 2, pb: 1, px: 2.5}}>
          <Label
            sx={{padding: '5px 12px', height: 'auto', borderRadius: '30px', cursor: 'pointer', color: `${status.selectedTab === 'all' ? '#2563eb' : ''}`, backgroundColor: `${status.selectedTab === 'all' ? '#eff6ff' : ''}`}}
            onClick={() => setStatus({...status, selectedTab: 'all'})}
          >
            <Typography fontSize='0.9rem'>All Notification</Typography>
          </Label>
          <Label
            sx={{padding: '5px 12px', height: 'auto', borderRadius: '30px', cursor: 'pointer', color: `${status.selectedTab === 'unread' ? '#2563eb' : ''}`, backgroundColor: `${status.selectedTab === 'unread' ? '#eff6ff' : ''}`}}
            onClick={() => setStatus({...status, selectedTab: 'unread'})}
          >
            <Typography fontSize='0.9rem'>Unread</Typography>
          </Label>
        </Stack>

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ pt: 1, pb: 1, px: 2.5, typography: 'overline' }}>
                TODAY
              </ListSubheader>
            }
          >
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'solid' }} />

        {/* <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box> */}
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }: { notification: any }) {
  const { avatar, title } = renderContent(notification);

  return (
    <Box padding='5px 10px'>
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          backgroundColor: '#fafbfc',
          borderRadius: '10px'
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
        />
        <Box ml='5px'>
          <Stack direction="column" alignItems="flex-end" spacing={1}>
            <Typography variant="caption" color="text.disabled" textAlign="center">{"08:15"}</Typography>
            {notification.isUnRead &&
              <StyledDotBadge></StyledDotBadge>
            }
          </Stack>
        </Box>
      </ListItemButton>
    </Box>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification: any) {
  const title = (
    <Box>
      <Typography variant="subtitle2" fontSize='0.95rem'>
        {notification.title}
      </Typography>
      <Typography component="span" color="text.disabled" sx={{lineHeight: 1, fontSize: '0.9rem'}}>
        {notification.description}
      </Typography>
    </Box>
  );

  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title,
  }
}

const StyledBadge = styled.div`
  .css-11qscst-MuiBadge-badge {
    top: 2px;
    right: 2px;
    background-color: #e11d48;
    aspect-ratio: 1;
  }
`

const StyledDotBadge = styled.div`
  background-color: #ed4f9d;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`