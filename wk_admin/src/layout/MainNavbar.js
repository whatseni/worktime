import { Icon } from "@iconify/react/dist/iconify.js"
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { AppBar, IconButton, styled, Toolbar, Box, Stack } from "@mui/material"
import UserPopover from "./UserPopover";

const Root = styled(AppBar)({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)'
})

const ToolbarStyle = styled(Toolbar)({
  minHeight: 92,
})

export default function MainNavbar({ onOpenSidebar }) {
  return (
    <Root>
      <ToolbarStyle>
        <IconButton sx={{ mr: 1, color: 'text.primary' }} onClick={onOpenSidebar}>
          <Icon icon={menu2Fill} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <UserPopover />
        </Stack>
      </ToolbarStyle>
    </Root>
  )
}