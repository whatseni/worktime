import { Box, List, ListItemText, ListItemIcon, ListItemButton, styled } from "@mui/material";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(
  () => ({
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    paddingLeft: "5px",
    paddingRight: "2.5px",
    color: '#637381',
    '&:before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: 'none',
      position: 'absolute',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: '#00AB55'
    }
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

function NavItem({ item, active }) {
  const isActiveRoot = active(item.path);
  const { title, path, icon, info } = item;

  const activeRootStyle = {
    color: '#00AB55',
    fontWeight: 'fontWeightMedium',
    // bgcolor: '#00AB55',
    '&:before': { display: 'block' }
  };


  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle)
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

export default function SidebarContent({ config }) {
  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box>
      <List disablePadding>
        {config.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  )
}