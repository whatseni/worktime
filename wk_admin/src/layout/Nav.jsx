
import sidebarConfig from '../configs/SidebarConfig';
import { Icon } from "@iconify/react";
import { alpha, Avatar, Box, Drawer, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import { NAV } from './config-layout';
import { useEffect } from 'react';
import { useResponsive } from '../hooks/use-responsive';
import Scrollbar from "../components/Scrollbar"
import { orange } from '@mui/material/colors';
import {  Link as RouterLink } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const upLg = useResponsive('up', 'lg');
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, []);
  const renderContent = (
    <Scrollbar sx={{
      height: 1,
      '& .simplebar-content': {
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      },
    }}>
        <Box sx={{ px: 2.5, py: 3}}>
          <Box  component={RouterLink} to="/" sx={{display: 'inline-flex'}}>
            <IconButton sx={{ width:40, height: 40 }}>
              <Icon icon="eva:home-outline" />
            </IconButton>
          </Box>
        </Box>

      <Box
        sx={{
          my: 3,
          mx: 2.5,
          py: 2,
          px: 2.5,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        }}
      >
        <Avatar sx={{ bgcolor: orange }}>N</Avatar>

        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2">test@test.com</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            hello
          </Typography>
        </Box>
      </Box>
      <Stack component="nav" spacing={0.5} sx={{ px: 2, marginTop: "100px" }}>
        {
          sidebarConfig.map((item) => (
            <NavItem key={item.title} item={item} />
          ))
        }
      </Stack>
    </Scrollbar>
  )
  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: "280px",
      }}
    >

      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
function NavItem({ item }) {
  return (
    <ListItemButton
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}