import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

interface ToolbarProps {
  numSelected: any;
}
export default function UserToolbar({ numSelected }: ToolbarProps) {
  return (
    <Toolbar sx={[
      {
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      },
      numSelected.length > 0 && {
        bgcolor: (theme) =>
          alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      },
    ]}>
      {numSelected.length > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      {numSelected.length > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}