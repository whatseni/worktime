import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

interface ToolbarProps {
  numSelected: string[];
  onClickDeleteUser: () => Promise<void>;
}
export default function UserToolbar({ numSelected, onClickDeleteUser }: ToolbarProps) {
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
          {numSelected.length} 명 선택
        </Typography>
      )}
      {numSelected.length > 0 && (
        <Tooltip title="Delete" onClick={onClickDeleteUser}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}