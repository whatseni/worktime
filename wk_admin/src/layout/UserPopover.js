import { Avatar, Box, Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

export default function UserPopover() {

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogout = () => {
    console.log('logout')
  }
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: '#161C24'
            }
          })
        }}>
        <Avatar alt="User" src="/static/user.png" />
      </IconButton>
      <Popover open={open} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            to='/login'
            fullWidth
            color="inherit"
            variant="outlined"
            component={RouterLink}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  )
}