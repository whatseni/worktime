import { Avatar, Drawer, styled, useMediaQuery, Box, Typography } from "@mui/material"
import { Link, Link as RouterLink } from 'react-router-dom';
import SidebarContent from './SidebarContent';

const Root = styled('div')({
  width: "280px"
})

const Account = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 12,
  backgroundColor: '#F4F6F8'
}));

export default function MainSidebar({ sidebarConfig, sidebarOpen, onCloseSidebar }) {
  const matches = useMediaQuery('(min-width: 1200px)');
  return (
    <Root>
      <Drawer variant={matches && "permanent"} open={sidebarOpen} onClose={onCloseSidebar} PaperProps={{
        sx: { width: 280 }
      }}>
        <Box sx={{ px: 2.5, py: 3 }}>
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Box component="img" src="/static/favicon.ico" sx={{ width: 40, height: 40 }} />
          </Box>
        </Box>

        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" component={RouterLink} to="#">
            <Account>
              <Avatar src="/static/user.png" alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  계정 아이디
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  어드민
                </Typography>
              </Box>
            </Account>
          </Link>
        </Box>

        <SidebarContent config={sidebarConfig} />
        <Box sx={{ flexGrow: 1 }} />
      </Drawer>
    </Root>
  )
}